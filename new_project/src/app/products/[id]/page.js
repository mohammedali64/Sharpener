export default function ProductDetailPage({ params }) {
  const { id } = params; 

  return (
    <div style={{
      border: "2px solid #000",
      padding: "20px",
      width: "fit-content",
      margin: "20px auto"
    }}>
      <h2>Product {id} details page — content coming soon!</h2>
    </div>
  );
}
