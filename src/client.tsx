
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rtzyepfospvwrlnuyilv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0enllcGZvc3B2d3JsbnV5aWx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMxMDA2ODQsImV4cCI6MjAzODY3NjY4NH0.nPoN0IFqVZcT4wLaKd0xkkGp-JzXrL3L5-PvolE3Txg'

export const supabase = createClient(supabaseUrl, supabaseKey)