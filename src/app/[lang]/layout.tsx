import { i18nConfig } from "@/i18n/config";

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({
    lang: locale.code,
  }));
}

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function LangLayout({
  children,
  params,
}: LayoutProps) {
  const { lang } = await params;
  return (
    <div lang={lang}>
      {children}
    </div>
  );
} 