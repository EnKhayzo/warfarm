import React from 'react';
import CategoryHome from './CategoryHome';

export async function generateStaticParams() {
  return [
    { category: "items" },
    { category: "components" },
    { category: "relics" },
    { category: "missions" }
  ];
}

export default function CategoryPage({ params }) {
  const { category } = params;

  return (
    <CategoryHome category={category} />
  );
}
