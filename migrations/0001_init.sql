CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  status TEXT NOT NULL,
  payment_status TEXT NOT NULL,
  payment_provider TEXT,
  payment_reference TEXT,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  address_line1 TEXT NOT NULL,
  address_line2 TEXT,
  postal_code TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  notes TEXT,
  items_json TEXT NOT NULL,
  total_amount REAL NOT NULL,
  currency TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
