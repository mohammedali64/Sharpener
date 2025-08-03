import Link from "next/link";

export default function ProductsPage() {
  const productIds = Array.from({ length: 10 }, (_, i) => i + 1); 

  return (
    <div>
      <h1>Products Page</h1>
      <ul>
        {productIds.map((id) => (
          <li key={id}>
            <Link href={`/products/${id}`}>Product {id}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
