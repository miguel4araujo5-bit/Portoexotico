import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type OrderItem = {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  image?: string;
};

type Order = {
  id: string;
  created_at: string;
  updated_at: string;
  status: string;
  payment_status: string;
  payment_provider: string | null;
  payment_reference: string | null;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  address_line1: string;
  address_line2: string | null;
  postal_code: string;
  city: string;
  country: string;
  notes: string | null;
  total_amount: number;
  currency: string;
  items: OrderItem[];
};

const statusOptions = [
  'all',
  'pending',
  'paid',
  'processing',
  'shipped',
  'completed',
  'cancelled',
] as const;

const paymentStatusOptions = ['all', 'pending', 'paid', 'failed', 'refunded'] as const;

const statusLabels: Record<string, string> = {
  all: 'Todas',
  pending: 'Pendente',
  paid: 'Paga',
  processing: 'Em processamento',
  shipped: 'Enviada',
  completed: 'Concluída',
  cancelled: 'Cancelada',
};

const paymentStatusLabels: Record<string, string> = {
  all: 'Todos',
  pending: 'Pendente',
  paid: 'Pago',
  failed: 'Falhado',
  refunded: 'Reembolsado',
};

const getOrderStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'pending':
      return 'border-amber-400/20 bg-amber-400/10 text-amber-200';
    case 'paid':
      return 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200';
    case 'processing':
      return 'border-sky-400/20 bg-sky-400/10 text-sky-200';
    case 'shipped':
      return 'border-violet-400/20 bg-violet-400/10 text-violet-200';
    case 'completed':
      return 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200';
    case 'cancelled':
      return 'border-red-400/20 bg-red-400/10 text-red-200';
    default:
      return 'border-white/10 bg-white/5 text-white/70';
  }
};

const getPaymentStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'pending':
      return 'border-amber-400/20 bg-amber-400/10 text-amber-200';
    case 'paid':
      return 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200';
    case 'failed':
      return 'border-red-400/20 bg-red-400/10 text-red-200';
    case 'refunded':
      return 'border-violet-400/20 bg-violet-400/10 text-violet-200';
    default:
      return 'border-white/10 bg-white/5 text-white/70';
  }
};

const formatCurrency = (amount: number, currency: string) => {
  try {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: currency || 'EUR',
    }).format(amount);
  } catch {
    return `${amount.toFixed(2)} ${currency || 'EUR'}`;
  }
};

const formatDateTime = (value: string) => {
  try {
    return new Intl.DateTimeFormat('pt-PT', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(new Date(value));
  } catch {
    return value;
  }
};

const AdminOrders: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<(typeof statusOptions)[number]>('all');
  const [paymentStatusFilter, setPaymentStatusFilter] =
    useState<(typeof paymentStatusOptions)[number]>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const loadOrders = async () => {
    setIsLoading(true);
    setError('');

    try {
      const params = new URLSearchParams();

      if (statusFilter !== 'all') {
        params.set('status', statusFilter);
      }

      if (paymentStatusFilter !== 'all') {
        params.set('paymentStatus', paymentStatusFilter);
      }

      const sessionResponse = await fetch('/api/admin/session', {
        credentials: 'include',
      });

      if (!sessionResponse.ok) {
        navigate('/admin');
        return;
      }

      const response = await fetch(`/api/admin/orders?${params.toString()}`, {
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        setError(data.error || 'Erro ao carregar encomendas');
        return;
      }

      setOrders(data.orders || []);
    } catch {
      setError('Erro ao ligar ao servidor');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadOrders();
  }, [statusFilter, paymentStatusFilter]);

  useEffect(() => {
    if (!selectedOrder) {
      return;
    }

    const updatedSelectedOrder = orders.find((order) => order.id === selectedOrder.id);

    if (updatedSelectedOrder) {
      setSelectedOrder(updatedSelectedOrder);
    }
  }, [orders, selectedOrder]);

  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, order) => sum + order.total_amount, 0);
  }, [orders]);

  const paidOrdersCount = useMemo(() => {
    return orders.filter((order) => order.payment_status === 'paid').length;
  }, [orders]);

  const pendingOrdersCount = useMemo(() => {
    return orders.filter((order) => order.status === 'pending').length;
  }, [orders]);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', {
      method: 'POST',
      credentials: 'include',
    });

    navigate('/admin');
  };

  const handleSelectOrder = async (id: string) => {
    setError('');

    try {
      const response = await fetch(`/api/admin/orders/${id}`, {
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        setError(data.error || 'Erro ao carregar detalhe');
        return;
      }

      setSelectedOrder(data.order);
    } catch {
      setError('Erro ao carregar detalhe');
    }
  };

  const updateOrder = async (payload: {
    status?: string;
    payment_status?: string;
  }) => {
    if (!selectedOrder) return;

    setIsSaving(true);
    setError('');

    try {
      const response = await fetch(`/api/admin/orders/${selectedOrder.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        setError(data.error || 'Erro ao atualizar encomenda');
        return;
      }

      setSelectedOrder(data.order);

      setOrders((current) =>
        current.map((order) => {
          if (order.id !== data.order.id) return order;
          return data.order;
        })
      );
    } catch {
      setError('Erro ao atualizar encomenda');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 md:px-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.28em] text-white/60">
              Admin
            </span>
            <h1 className="mt-4 text-3xl font-semibold md:text-5xl">Encomendas</h1>
            <p className="mt-3 max-w-2xl text-white/60">
              Gestão privada de pedidos, estados operacionais e pagamento.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => void loadOrders()}
              className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium transition hover:border-white/30 hover:bg-white/10"
            >
              Atualizar
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:scale-[1.01]"
            >
              Terminar sessão
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm text-white/55">Total de encomendas</p>
            <p className="mt-3 text-3xl font-semibold">{orders.length}</p>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm text-white/55">Receita filtrada</p>
            <p className="mt-3 text-3xl font-semibold">{formatCurrency(totalRevenue, 'EUR')}</p>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm text-white/55">Pagamentos confirmados</p>
            <p className="mt-3 text-3xl font-semibold">{paidOrdersCount}</p>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm text-white/55">Pendentes</p>
            <p className="mt-3 text-3xl font-semibold">{pendingOrdersCount}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white/60">Estado da encomenda</label>
            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value as (typeof statusOptions)[number])
              }
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option} className="bg-neutral-950">
                  {statusLabels[option] || option}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-white/60">Estado do pagamento</label>
            <select
              value={paymentStatusFilter}
              onChange={(event) =>
                setPaymentStatusFilter(event.target.value as (typeof paymentStatusOptions)[number])
              }
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
            >
              {paymentStatusOptions.map((option) => (
                <option key={option} value={option} className="bg-neutral-950">
                  {paymentStatusLabels[option] || option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error ? (
          <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        ) : null}

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]">
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-left text-xs uppercase tracking-[0.2em] text-white/45">
                    <th className="px-5 py-4 font-medium">ID</th>
                    <th className="px-5 py-4 font-medium">Cliente</th>
                    <th className="px-5 py-4 font-medium">Total</th>
                    <th className="px-5 py-4 font-medium">Encomenda</th>
                    <th className="px-5 py-4 font-medium">Pagamento</th>
                    <th className="px-5 py-4 font-medium">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={6} className="px-5 py-10 text-center text-white/50">
                        A carregar...
                      </td>
                    </tr>
                  ) : orders.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-5 py-10 text-center text-white/50">
                        Sem encomendas para mostrar.
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => {
                      const isSelected = selectedOrder?.id === order.id;

                      return (
                        <tr
                          key={order.id}
                          onClick={() => void handleSelectOrder(order.id)}
                          className={`cursor-pointer border-b border-white/5 transition ${
                            isSelected ? 'bg-white/[0.06]' : 'hover:bg-white/[0.03]'
                          }`}
                        >
                          <td className="px-5 py-4 text-sm font-medium">{order.id}</td>
                          <td className="px-5 py-4 text-sm">
                            <div>{order.customer_name}</div>
                            <div className="text-white/45">{order.customer_email}</div>
                          </td>
                          <td className="px-5 py-4 text-sm">
                            {formatCurrency(order.total_amount, order.currency)}
                          </td>
                          <td className="px-5 py-4 text-sm">
                            <span
                              className={`inline-flex rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.2em] ${getOrderStatusBadgeClass(order.status)}`}
                            >
                              {statusLabels[order.status] || order.status}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-sm">
                            <span
                              className={`inline-flex rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.2em] ${getPaymentStatusBadgeClass(order.payment_status)}`}
                            >
                              {paymentStatusLabels[order.payment_status] || order.payment_status}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-sm text-white/55">
                            {formatDateTime(order.created_at)}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
            {!selectedOrder ? (
              <div className="flex h-full min-h-[420px] items-center justify-center text-center text-white/45">
                Seleciona uma encomenda para ver o detalhe.
              </div>
            ) : (
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-white/45">Detalhe</p>
                    <h2 className="mt-3 text-2xl font-semibold">{selectedOrder.id}</h2>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.2em] ${getOrderStatusBadgeClass(selectedOrder.status)}`}
                    >
                      {statusLabels[selectedOrder.status] || selectedOrder.status}
                    </span>
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.2em] ${getPaymentStatusBadgeClass(selectedOrder.payment_status)}`}
                    >
                      {paymentStatusLabels[selectedOrder.payment_status] ||
                        selectedOrder.payment_status}
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-white/45">Cliente</p>
                    <p className="mt-1">{selectedOrder.customer_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/45">Email</p>
                    <p className="mt-1 break-all">{selectedOrder.customer_email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/45">Telefone</p>
                    <p className="mt-1">{selectedOrder.customer_phone || '—'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/45">Total</p>
                    <p className="mt-1">
                      {formatCurrency(selectedOrder.total_amount, selectedOrder.currency)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-white/45">Criada em</p>
                    <p className="mt-1">{formatDateTime(selectedOrder.created_at)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/45">Atualizada em</p>
                    <p className="mt-1">{formatDateTime(selectedOrder.updated_at)}</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-white/45">Método de pagamento</p>
                    <p className="mt-1">{selectedOrder.payment_provider || '—'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/45">Referência</p>
                    <p className="mt-1 break-all">{selectedOrder.payment_reference || '—'}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-sm text-white/45">Morada</p>
                  <p className="mt-1">
                    {selectedOrder.address_line1}
                    {selectedOrder.address_line2 ? `, ${selectedOrder.address_line2}` : ''}
                    <br />
                    {selectedOrder.postal_code} {selectedOrder.city}
                    <br />
                    {selectedOrder.country}
                  </p>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm text-white/60">Estado encomenda</label>
                    <select
                      value={selectedOrder.status}
                      onChange={(event) => void updateOrder({ status: event.target.value })}
                      disabled={isSaving}
                      className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
                    >
                      {statusOptions
                        .filter((option) => option !== 'all')
                        .map((option) => (
                          <option key={option} value={option} className="bg-neutral-950">
                            {statusLabels[option] || option}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-white/60">Estado pagamento</label>
                    <select
                      value={selectedOrder.payment_status}
                      onChange={(event) =>
                        void updateOrder({ payment_status: event.target.value })
                      }
                      disabled={isSaving}
                      className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
                    >
                      {paymentStatusOptions
                        .filter((option) => option !== 'all')
                        .map((option) => (
                          <option key={option} value={option} className="bg-neutral-950">
                            {paymentStatusLabels[option] || option}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-sm text-white/45">Itens</p>
                  <div className="mt-3 space-y-3">
                    {selectedOrder.items.map((item) => (
                      <div
                        key={`${item.productId}-${item.name}`}
                        className="rounded-2xl border border-white/10 bg-black/20 p-4"
                      >
                        <div className="flex items-start gap-4">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-16 w-16 rounded-2xl object-cover"
                            />
                          ) : null}

                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="mt-1 text-sm text-white/50">ID: {item.productId}</p>
                              </div>

                              <div className="text-right">
                                <p className="text-sm">Qtd: {item.quantity}</p>
                                <p className="mt-1 text-sm text-white/60">
                                  {formatCurrency(item.unitPrice, selectedOrder.currency)}
                                </p>
                              </div>
                            </div>

                            <p className="mt-3 text-sm text-white/65">
                              Total item:{' '}
                              {formatCurrency(item.unitPrice * item.quantity, selectedOrder.currency)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-sm text-white/45">Notas</p>
                  <p className="mt-2 rounded-2xl border border-white/10 bg-black/20 p-4 text-white/75">
                    {selectedOrder.notes || 'Sem notas'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminOrders;

export default AdminOrders;
