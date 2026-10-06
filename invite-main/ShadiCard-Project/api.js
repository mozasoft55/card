const API_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzVWoKa7p1IuP5w0CzQeAZmt0A8XHezxL4OkAygELlu8UWsODC1mbg1yp3KimIB4Do/exec';
const REQUEST_TIMEOUT_MS = 15000;

export async function fetchWeddingBySlug(slug) {
  const normalizedSlug = String(slug || '').trim();
  if (!normalizedSlug) {
    throw new Error('A wedding link is required.');
  }

  const url = new URL(API_ENDPOINT);
  url.searchParams.set('action', 'wedding');
  url.searchParams.set('slug', normalizedSlug);
  url.searchParams.set('_', String(Date.now()));

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      cache: 'no-store',
      signal: controller.signal
    });
    if (!response.ok) {
      throw new Error(`Wedding service returned HTTP ${response.status}.`);
    }

    const data = await response.json();
    if (!data || data.success !== true || !data.wedding || typeof data.wedding !== 'object') {
      throw new Error(data?.error || 'Wedding record not found.');
    }

    return {
      ...data,
      events: Array.isArray(data.events) ? data.events : []
    };
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('The wedding service took too long to respond. Please try again.');
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
