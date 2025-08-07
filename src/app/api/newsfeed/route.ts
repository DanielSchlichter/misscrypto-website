import { NextRequest, NextResponse } from 'next/server';
import { 
  getNewsfeedPosts, 
  getNewsfeedPostBySlug, 
  createNewsfeedPost, 
  incrementPostViews 
} from '@/lib/firestore';

interface NewsfeedPost {
  title: string;
  content: string;
  excerpt?: string;
  slug: string;
  category: string;
  status: 'draft' | 'published';
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  author: string;
  views: number;
  likes: number;
  featuredImage?: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

// Hilfsfunktionen
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[äöüß]/g, (match) => {
      const replacements: { [key: string]: string } = {
        'ä': 'ae', 'ö': 'oe', 'ü': 'ue', 'ß': 'ss'
      };
      return replacements[match] || match;
    })
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .replace(/^-+|-+$/g, '');
}

function generateExcerpt(content: string, maxLength: number = 160): string {
  // Entferne HTML-Tags und erstelle Kurzfassung
  const textContent = content.replace(/<[^>]*>/g, '');
  if (textContent.length <= maxLength) {
    return textContent;
  }
  return textContent.substring(0, maxLength).trim() + '...';
}

// GET - Alle Posts oder einzelnen Post abrufen
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = parseInt(searchParams.get('skip') || '0');

    // Bei fehlendem Firebase: Mock-Daten zurückgeben
    if (process.env.SKIP_MONGODB === 'true') {
      console.log('Keine Firebase - verwende Mock-Daten');
      return NextResponse.json({
        posts: [],
        pagination: { total: 0, limit, skip, hasMore: false }
      });
    }

    if (slug) {
      // Einzelnen Post abrufen
      const post = await getNewsfeedPostBySlug(slug);
      
      if (!post) {
        return NextResponse.json(
          { error: 'Post nicht gefunden' },
          { status: 404 }
        );
      }

      // Views erhöhen wenn Post veröffentlicht ist
      if ((post as any).status === 'published') {
        await incrementPostViews(slug);
        (post as any).views = ((post as any).views || 0) + 1;
      }

      return NextResponse.json(post);
    }

    // Alle Posts abrufen
    const posts = await getNewsfeedPosts(status || undefined, limit, skip);
    const total = posts.length; // Vereinfachung für jetzt

    return NextResponse.json({
      posts,
      pagination: {
        total,
        limit,
        skip,
        hasMore: skip + limit < total
      }
    });

  } catch (error) {
    console.error('Newsfeed GET Fehler:', error);
    return NextResponse.json(
      { error: 'Fehler beim Laden der Posts' },
      { status: 500 }
    );
  }
}

// POST - Neuen Post erstellen
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      content,
      category,
      status = 'draft',
      metaTitle,
      metaDescription,
      keywords = [],
      featuredImage
    } = body;

    // Validierung
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Titel und Inhalt sind erforderlich' },
        { status: 400 }
      );
    }

    // Slug generieren - Firestore prüft automatisch auf Eindeutigkeit
    const slug = generateSlug(title);

    const newPost = {
      title: title.trim(),
      content,
      excerpt: generateExcerpt(content),
      slug,
      category: category || 'Allgemein',
      status,
      author: 'MissCrypto Admin', // TODO: Aus Session holen
      views: 0,
      likes: 0,
      seo: {
        metaTitle: metaTitle || title,
        metaDescription: metaDescription || generateExcerpt(content, 160),
        keywords: Array.isArray(keywords) ? keywords : []
      },
      featuredImage: featuredImage || undefined
    };

    const result = await createNewsfeedPost(newPost);

    if (result.success) {
    return NextResponse.json({
      success: true,
        postId: result.id,
      slug: newPost.slug,
      message: 'Post erfolgreich erstellt'
    });
    } else {
      return NextResponse.json(
        { error: result.error || 'Fehler beim Erstellen des Posts' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Newsfeed POST Fehler:', error);
    return NextResponse.json(
      { error: 'Fehler beim Erstellen des Posts' },
      { status: 500 }
    );
  }
}

// PUT - Post bearbeiten
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Post-ID ist erforderlich' },
        { status: 400 }
      );
    }

    // TODO: Implementiere Update-Funktionalität in Firestore
    return NextResponse.json(
      { error: 'Update-Funktionalität noch nicht implementiert' },
      { status: 501 }
      );

  } catch (error) {
    console.error('Newsfeed PUT Fehler:', error);
    return NextResponse.json(
      { error: 'Fehler beim Aktualisieren des Posts' },
      { status: 500 }
    );
  }
}

// DELETE - Post löschen
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Post-ID ist erforderlich' },
        { status: 400 }
      );
    }

    // TODO: Implementiere Delete-Funktionalität in Firestore
      return NextResponse.json(
      { error: 'Delete-Funktionalität noch nicht implementiert' },
      { status: 501 }
      );

  } catch (error) {
    console.error('Newsfeed DELETE Fehler:', error);
    return NextResponse.json(
      { error: 'Fehler beim Löschen des Posts' },
      { status: 500 }
    );
  }
} 