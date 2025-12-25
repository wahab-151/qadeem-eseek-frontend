import { useTheme } from "@mui/material/styles";
import Image from "next/image";

const CardDisplay = ({
cardId,
selectedCardId,
onSelect,
brand,
last4,
exp_month,
exp_year,
}) => {
const theme = useTheme();

const isSelected = cardId === selectedCardId;
const color= brand === "visa" ? theme.palette.primary.main :theme.palette.secondary.main;
const cardWrapperStyle = {
width: "300px",
height: "180px",
backgroundColor: color,
borderRadius: "15px",
position: "relative",
color: "white",
fontFamily: "Arial, sans-serif",
padding: "20px",
boxShadow: isSelected ? "0 0 0 4px #60A5FA" : "0 5px 15px rgba(0,0,0,0.3)",
cursor: "pointer",
display: "flex",
flexDirection: "column",
justifyContent: "space-between",
};

return (
    
<label className="inline-block" style={{display:"flex", gap:"8px" , marginBottom:"8px"}}>
<input
type="radio"
name="card"
value={cardId}
checked={isSelected}
onChange={() => onSelect(cardId)}
className="sr-only"
/>
<div style={cardWrapperStyle}>
<div className="text-lg font-semibold uppercase">{brand} Card</div>
<div>
<div style={{ fontSize: "1.2rem", letterSpacing: "2px" }}>
**** **** **** {last4}
</div>
<div style={{ fontSize: "0.9rem", marginTop: "10px" , display:"flex", justifyContent:"space-between"}} >
  <span>Exp: {exp_month}/{exp_year}</span>
  <Image
    src={`/assets/images/payment-methods/${brand}.png`}
    alt={`${brand} logo`}
    width={28}
    height={18}
    className="object-contain"
  />
</div>
</div>
</div>
</label>
);
};

export default CardDisplay;