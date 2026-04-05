import { useState, useEffect, useCallback } from 'react'

const MAX_NOTES = 200

export default function useGuestbook() {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const load = useCallback(async () => {
    try {
      const r = await fetch('/api/guestbook')
      if (!r.ok) return
      const ct = r.headers.get('content-type') || ''
      if (!ct.includes('application/json')) return
      const data = await r.json()
      setNotes(Array.isArray(data.notes) ? data.notes : [])
    } catch {
      // Yükleme hatası sessizce geçilir — damla katmanı boş kalır
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const submit = useCallback(async ({ message, author, website }) => {
    setSubmitting(true)
    setSubmitError(null)
    try {
      const r = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, author, website: website || '' }),
      })
      const ct = r.headers.get('content-type') || ''
      const data = ct.includes('application/json') ? await r.json().catch(() => ({})) : {}
      if (!r.ok) throw new Error(data.error || 'Bir şeyler ters gitti')
      if (data.note) {
        setNotes(prev => [data.note, ...prev].slice(0, MAX_NOTES))
      }
      return { ok: true, note: data.note }
    } catch (e) {
      setSubmitError(e.message)
      return { ok: false, error: e.message }
    } finally {
      setSubmitting(false)
    }
  }, [])

  const clearError = useCallback(() => setSubmitError(null), [])

  return { notes, loading, submitting, error: submitError, submit, clearError, reload: load }
}
