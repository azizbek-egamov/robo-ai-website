'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/components/language-provider';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';

interface Test {
  id: number;
  name: string;
  image: string;
  description: string;
  google_form_link: string;
  created_at: string;
  updated_at: string;
}

export default function TestsPage() {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t, language } = useLanguage();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tests/`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Handle different API response formats
        let testsData: Test[] = [];
        if (Array.isArray(data)) {
          testsData = data;
        } else if (data && typeof data === 'object') {
          if (data.results) {
            testsData = data.results;
          } else if (data.tests) {
            testsData = data.tests;
          } else {
            testsData = Object.values(data);
          }
        }
        
        if (!Array.isArray(testsData)) {
          throw new Error('Invalid data format received from server');
        }

        // Validate test data
        const validatedTests = testsData.map(test => ({
          id: test.id || 0,
          name: test.name || 'Test',
          image: test.image || '/placeholder.png',
          description: test.description || '',
          google_form_link: test.google_form_link || '#',
          created_at: test.created_at || new Date().toISOString(),
          updated_at: test.updated_at || new Date().toISOString()
        }));
        
        setTests(validatedTests);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching tests:', err);
        setError(err instanceof Error ? err.message : 'Testlarni yuklashda xatolik yuz berdi');
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <div className="space-y-4">
              <Skeleton className="h-12 w-3/4 mx-auto" />
              <Skeleton className="h-6 w-1/2 mx-auto" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">{t('tests')}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('testsDescription')}
            </p>
          </div>

          {error ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 mb-4">
                <AlertCircle className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-medium mb-2">{error}</h2>
              <p className="text-muted-foreground">
                {t('errorLoadingTests')}
              </p>
            </div>
          ) : tests.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-600 mb-4">
                <AlertCircle className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-medium mb-2">{t('noTestsAvailable')}</h2>
              <p className="text-muted-foreground">
                {t('checkBackLater')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tests.map((test) => (
                <Card key={test.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={test.image}
                      alt={`${test.name} testi rasmi`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={false}
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{test.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{test.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <a
                        href={test.google_form_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t('startTest')}
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 