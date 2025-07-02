import { NextRequest, NextResponse } from 'next/server';

const MAILERLITE_API_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiN2U2NTRkZDY1M2NkMWM1NWIzOWZjN2ZiZGZmNTE3YTI5Y2JlZDdmYjVkOThhZmJjY2UzMjg0OTgzZWI3ZTY3Y2Y0N2IzYTIxN2UxNjkyYmIiLCJpYXQiOjE3NTEzOTY5MzcuOTQxNDI5LCJuYmYiOjE3NTEzOTY5MzcuOTQxNDMyLCJleHAiOjQ5MDcwNzA1MzcuOTM2NDc3LCJzdWIiOiIxMDQ5MjEwIiwic2NvcGVzIjpbXX0.YqYeAGJwB4PQx8ngPN237f5kOcQZvSJPB5siLWM9URdVyo2MzrWw6b1SQibUlTx1wIbV9pysGyMx6wqqSopEMujSsyd-QpGKo00RaNIwwXeb98AXJIo-9PViJbCx-u1vNn82YW81wCfOtZt8bUCHHZeKQmUs6Fu0EgBoI6G4TMMGjGq8Tpt-ykAxD1spCnYFNPHEGhsVg65LI2qJJ4yHWaACuoa3pD2h8S5S87qKPfg9qp4zw_1Ln8o_SUErQ8vmP0SgLLBQ_kc5fjqdWMUVL-FsUsPq1CDl_EH-Ai-uW98EtmYoXc5vfKe5_SN3REDQAm-IYmXuGcJge5yDm3bhwCeikD27XEdMrvDswmo-fGwCnteTfOfF3cJSEprcJSGT09tf3obwxOsviM_GbwF-FxUIfN6w1sNozGp84t7MqEgQKXAdUvT_F93UIsmOSR_4iMQ-DUvuRYIqo89To1j-P1RWshksIEeiHfRJduqzKgll_NjmXtBmDW4Lv1c399izmosJORTs_gAbzjNvxQ7eimsHO3vYSXf66q0__9IcVopBcfQLG1FWKpz-mTWeJCOjHohpiJabfkLI3FkM9OHRAtYwxHFGHJm3XpqgFKHQtNQVqiCb5AgSruKxEX4TpRvHN8a5c_iIcoAP3CN-WuPefakqs5mv2o9jshWyaBCYPBI';
const MAILERLITE_API_URL = 'https://connect.mailerlite.com/api';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email } = body;

    // Validierung
    if (!name || !email) {
      return NextResponse.json(
        { 
          error: 'Name und E-Mail sind erforderlich',
          success: false 
        },
        { status: 400 }
      );
    }

    // E-Mail Validierung
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          error: 'Bitte gib eine gültige E-Mail-Adresse ein',
          success: false 
        },
        { status: 400 }
      );
    }

    // MailerLite API Anfrage - Erst ohne Group probieren
    const response = await fetch(`${MAILERLITE_API_URL}/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${MAILERLITE_API_TOKEN}`,
      },
      body: JSON.stringify({
        email: email,
        fields: {
          name: name
        }
        // Keine Group ID, da die invalide war
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json({
        success: true,
        message: 'Du hast dich erfolgreich für den Newsletter angemeldet! Du erhältst eine E-Mail zur Bestätigung.',
        data: data
      });
    } else {
      // Prüfen auf spezifische MailerLite Fehler
      if (data.errors && data.errors.email) {
        const emailError = data.errors.email[0];
        if (emailError.includes('already exists') || emailError.includes('taken')) {
          return NextResponse.json({
            success: false,
            error: 'Diese E-Mail-Adresse ist bereits für unseren Newsletter angemeldet.'
          }, { status: 400 });
        }
      }

      console.error('MailerLite API Fehler:', data);
      return NextResponse.json(
        { 
          error: 'Ein Fehler ist aufgetreten. Bitte versuche es später erneut.',
          success: false 
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Newsletter API Fehler:', error);
    return NextResponse.json(
      { 
        error: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es später erneut.',
        success: false 
      },
      { status: 500 }
    );
  }
} 