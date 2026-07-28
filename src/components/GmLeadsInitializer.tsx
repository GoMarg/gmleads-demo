'use client';

import { useEffect } from 'react';
import { GmLeads } from '@gmleads/sdk';

export function GmLeadsInitializer() {
  useEffect(() => {
    GmLeads.init({
      key: 'gml_demo_test_key_xyz', // Demo key
      accentColor: '#3b82f6', // Matching blue theme of the demo maybe, or any distinct color
    });

    return () => {
      GmLeads.destroy();
    };
  }, []);

  return null;
}
