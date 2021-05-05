import './MenuListItem.css';

export default function MenuListItem({ menuItem }) {
  return (
    <div className="MenuListItem">
      <div className="emoji flex-ctr-ctr">{menuItem.emoji}</div>
      <div className="name">{menuItem.name}</div>
      <div className="buy">
        <span>${menuItem.price.toFixed(2)}</span>
        <button className="btn-sm" onClick={() => console.log('clicked')}>
          ADD
        </button>
      </div>
    </div>
  );
}