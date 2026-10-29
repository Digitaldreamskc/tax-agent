import { supabase } from './supabase'

// ── Uploads ──────────────────────────────────────────────────────────────────
export async function getUploads() {
  try {
    const { data } = await supabase
      .from('uploads')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)
    return data ?? []
  } catch {
    return []
  }
}

export async function createUpload(filename: string, file_type: string, size_kb: number) {
  try {
    const { data } = await supabase
      .from('uploads')
      .insert({ filename, file_type, size_kb, status: 'PROCESSING' })
      .select()
      .single()
    return data
  } catch {
    return null
  }
}

export async function updateUploadStatus(id: string, status: string) {
  try {
    await supabase.from('uploads').update({ status }).eq('id', id)
  } catch {
    // silent
  }
}

// ── Transactions ─────────────────────────────────────────────────────────────
export async function saveTransactions(upload_id: string, transactions: any[]) {
  try {
    const rows = transactions.map(t => ({ ...t, upload_id }))
    const { data } = await supabase.from('transactions').insert(rows).select()
    return data
  } catch {
    return null
  }
}

export async function getTransactions() {
  try {
    const { data } = await supabase
      .from('transactions')
      .select('*')
      .order('created_at', { ascending: false })
    return data ?? []
  } catch {
    return []
  }
}

// ── Tax Analysis ─────────────────────────────────────────────────────────────
export async function saveAnalysis(analysis: any) {
  try {
    const { data } = await supabase
      .from('tax_analysis')
      .insert(analysis)
      .select()
      .single()
    return data
  } catch {
    return null
  }
}

export async function getLatestAnalysis() {
  try {
    const { data } = await supabase
      .from('tax_analysis')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
    return data
  } catch {
    return null
  }
}

// ── Opportunities ────────────────────────────────────────────────────────────
export async function saveOpportunities(analysis_id: string, opportunities: any[]) {
  try {
    const rows = opportunities.map(o => ({ ...o, analysis_id }))
    await supabase.from('opportunities').insert(rows)
  } catch {
    // silent
  }
}

export async function getOpportunities() {
  try {
    const { data } = await supabase
      .from('opportunities')
      .select('*')
      .order('created_at', { ascending: false })
    return data ?? []
  } catch {
    return []
  }
}

// ── Quarterly Payments ───────────────────────────────────────────────────────
export async function getQuarterlyPayments() {
  try {
    const { data } = await supabase
      .from('quarterly_payments')
      .select('*')
      .order('created_at', { ascending: true })
    return data ?? []
  } catch {
    return []
  }
}

export async function markQuarterlyPaid(id: string, paid_date: string) {
  try {
    await supabase
      .from('quarterly_payments')
      .update({ status: 'PAID', paid_date })
      .eq('id', id)
  } catch {
    // silent
  }
}

// ── Check if any real data exists ────────────────────────────────────────────
export async function hasRealData(): Promise<boolean> {
  try {
    const { count } = await supabase
      .from('tax_analysis')
      .select('*', { count: 'exact', head: true })
    return (count ?? 0) > 0
  } catch {
    return false
  }
}
