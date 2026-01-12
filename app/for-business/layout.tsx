import Header from "../components/Header";
import Footer from "../components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: '採用企業様向け - Global Sushi Career',
  description: '初期費用0円・掲載費0円。本物の日本人寿司職人を、リスクゼロで採用。完全成功報酬型の寿司職人特化型求人サービス。',
};

export default function ForBusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="pt-16">
        {children}
      </main>
      <Footer />
    </>
  );
}
