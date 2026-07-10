import Link from "next/link";

const offers = [
  { title: "WELCOME100", description: "Get ₹100 off on your first order", validity: "Valid for 30 days" },
  { title: "FIRSTORDER", description: "Flat ₹250 discount on your first purchase", validity: "Limited time" },
  { title: "FREESHIP", description: "Free shipping on orders above ₹999", validity: "Ends soon" },
];

export default function OffersPage() {
  return (
    <main className="page-shell">
      <h1>Offers and coupons</h1>
      <div className="card-list">
        {offers.map((offer) => (
          <div key={offer.title} className="card-row">
            <div>
              <h2>{offer.title}</h2>
              <p>{offer.description}</p>
            </div>
            <span>{offer.validity}</span>
          </div>
        ))}
      </div>
      <div className="card-actions">
        <Link href="/products" className="primary-btn">Shop now</Link>
      </div>
    </main>
  );
}
