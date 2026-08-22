export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

export function classNames(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function extractErrorMessage(data: any, fallbackMessage = 'An unexpected error occurred'): string {
  if (!data) return fallbackMessage;

  if (typeof data === 'string') {
    return data;
  }

  if (Array.isArray(data.message)) {
    return data.message.filter(Boolean).join('. ');
  }

  if (typeof data.message === 'string' && data.message.trim() !== '') {
    return data.message.trim();
  }

  if (typeof data.error === 'string' && data.error.trim() !== '') {
    return data.error.trim();
  }

  if (typeof data.code === 'string' && data.code.trim() !== '') {
    return data.code.trim();
  }

  return fallbackMessage;
}

