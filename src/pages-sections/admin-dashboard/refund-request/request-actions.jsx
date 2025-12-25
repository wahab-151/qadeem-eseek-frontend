import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { format } from "date-fns";

// GLOBAL CUSTOM COMPONENTS
import FlexBox from "components/flex-box/flex-box";
import { useEffect, useState } from "react";
import { FlexBetween } from "components/flex-box";


// ==============================================================


// ==============================================================

export default function RefundActions({
    id,
    createdAt,
    status,
    productName,
    onStatusChange,
    userName,
}) {

 



    const [selectedStatus, setSelectedStatus] = useState(status || "Pending");
    const [product, setProduct] = useState("");

    useEffect(() => {
        setSelectedStatus(status || "Pending");
        setProduct(productName || "");
    }, [status, productName]);


    const handleStatusChange = (e) => {
        try {
            const newStatus = e.target.value;
            setSelectedStatus(newStatus);
            onStatusChange(selectedStatus);

        } catch (error) {
            console.log("Error on change status", error?.message)
        }

    };

    const handleProductChange = (e) => {
        setProduct(e.target.value);
        // Optionally trigger search or add product logic
    };

    return <div>
        <FlexBetween flexWrap="wrap" alignItems="center" gap={2} mb={3}>
            <Typography variant="body1" sx={{ span: { color: "grey.600" } }}>
                <span>Request ID:</span> {id}
            </Typography>

            <Typography variant="body1" sx={{ span: { color: "grey.600" , textTransform:"capitalize" } }}>
                <span>User:</span> {userName?.toUpperCase() || "N/A"}
            </Typography>
        </FlexBetween>

    </div>;
}


