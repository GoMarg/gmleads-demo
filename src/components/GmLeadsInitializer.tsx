'use client';

import { useEffect } from 'react';
import { GmLeads } from '@gomarg/sdk';

export function GmLeadsInitializer() {
  useEffect(() => {
    GmLeads.init({
      key: process.env.NEXT_PUBLIC_DEMO_EMBED_KEY || 'gml_demo_test_key_xyz',
      accentColor: '#3b82f6',
    });

    return () => {
      GmLeads.destroy();
    };
  }, []);

  return null;
}
