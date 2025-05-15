import { NextResponse } from 'next/server';
import { supabase } from 'src/lib/supabase';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const { slug } = await request.json();
    
    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    const cookieStore = cookies();
    const viewedKey = `post-viewed-${slug}`;
    const hasViewed = cookieStore.get(viewedKey);

    if (!hasViewed) {
      cookies().set(viewedKey, '1', { 
        expires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        path: '/' 
      });
      
      const { data: existingData } = await supabase
        .from('post_views')
        .select('view_count')
        .eq('slug', slug)
        .single();
      
      const { error } = await supabase
        .from('post_views')
        .upsert(
          { 
            slug, 
            view_count: existingData ? existingData.view_count + 1 : 1,
            updated_at: new Date().toISOString()
          }
        );

      if (error) throw error;
    }

    const { data, error } = await supabase
      .from('post_views')
      .select('view_count')
      .eq('slug', slug)
      .single();

    if (error) throw error;

    return NextResponse.json({ 
      count: data?.view_count || 0 
    });
  } catch (error) {
    console.error('Error incrementing view count:', error);
    return NextResponse.json({ error: 'Failed to increment view count' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const slug = url.searchParams.get('slug');
    
    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('post_views')
      .select('view_count')
      .eq('slug', slug)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "No rows returned" error
      throw error;
    }

    return NextResponse.json({ 
      count: data?.view_count || 0 
    });
  } catch (error) {
    console.error('Error fetching view count:', error);
    return NextResponse.json({ error: 'Failed to fetch view count' }, { status: 500 });
  }
}
