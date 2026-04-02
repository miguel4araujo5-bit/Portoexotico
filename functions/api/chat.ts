function extractReply(result: unknown) {
  const extractContent = (value: unknown): string => {
    if (typeof value === 'string') {
      return value.trim();
    }

    if (Array.isArray(value)) {
      const text = value
        .map((item) => {
          if (typeof item === 'string') {
            return item;
          }

          if (
            item &&
            typeof item === 'object' &&
            typeof (item as Record<string, unknown>).text === 'string'
          ) {
            return ((item as Record<string, unknown>).text as string).trim();
          }

          return '';
        })
        .filter(Boolean)
        .join(' ')
        .trim();

      return text;
    }

    return '';
  };

  if (typeof result === 'string') {
    return result.trim();
  }

  if (!result || typeof result !== 'object') {
    return '';
  }

  const value = result as Record<string, unknown>;

  if (typeof value.response === 'string') {
    return value.response.trim();
  }

  if (typeof value.output_text === 'string') {
    return value.output_text.trim();
  }

  if (Array.isArray(value.result)) {
    const text = extractContent(value.result);

    if (text) {
      return text;
    }
  }

  if (value.result && typeof value.result === 'object') {
    const nested = value.result as Record<string, unknown>;

    if (typeof nested.response === 'string') {
      return nested.response.trim();
    }

    if (typeof nested.output_text === 'string') {
      return nested.output_text.trim();
    }

    if (Array.isArray(nested.choices) && nested.choices.length > 0) {
      const firstChoice = nested.choices[0] as Record<string, unknown>;

      if (firstChoice.message && typeof firstChoice.message === 'object') {
        const message = firstChoice.message as Record<string, unknown>;
        const text = extractContent(message.content);

        if (text) {
          return text;
        }
      }

      if (firstChoice.delta && typeof firstChoice.delta === 'object') {
        const delta = firstChoice.delta as Record<string, unknown>;
        const text = extractContent(delta.content);

        if (text) {
          return text;
        }
      }

      const directText = extractContent(firstChoice.text);

      if (directText) {
        return directText;
      }
    }
  }

  if (Array.isArray(value.choices) && value.choices.length > 0) {
    const firstChoice = value.choices[0] as Record<string, unknown>;

    if (firstChoice.message && typeof firstChoice.message === 'object') {
      const message = firstChoice.message as Record<string, unknown>;
      const text = extractContent(message.content);

      if (text) {
        return text;
      }
    }

    if (firstChoice.delta && typeof firstChoice.delta === 'object') {
      const delta = firstChoice.delta as Record<string, unknown>;
      const text = extractContent(delta.content);

      if (text) {
        return text;
      }
    }

    const directText = extractContent(firstChoice.text);

    if (directText) {
      return directText;
    }
  }

  return '';
}
