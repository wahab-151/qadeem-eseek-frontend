import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableCell from "@mui/material/TableCell";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import styled from "@mui/material/styles/styled";

// CUSTOM ICON COMPONENT
import UpDown from "icons/UpDown";


// STYLED COMPONENTS
const StyledTableCell = styled(TableCell)(({
  theme
}) => ({
  fontWeight: 600,
  padding: "16px 20px",
  color: "#2C2416", // Deep warm brown
  maxWidth:'300px',
  fontSize: "14px",
  letterSpacing: "0.5px",
  fontFamily: '"Times New Roman", Times, serif', // Elegant font for headers
}));


// ==============================================================


// ==============================================================

export default function TableHeader({
  order,
  heading,
  orderBy,
  onRequestSort,
  isSorting = false
}) {
  return <TableHead sx={{
    backgroundColor: "#EFE6D5", // Light heritage beige
    borderBottom: "2px solid #8B7548" // Heritage bronze border
  }}>
      <TableRow >
        {heading.map(headCell => <StyledTableCell key={headCell.id} align={headCell.align} sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel 
              active={orderBy === headCell.id} 
              onClick={() => onRequestSort(headCell.id)} 
              direction={orderBy === headCell.id ? order : "asc"} 
              disabled={isSorting}
              sx={{
                "& .MuiTableSortLabel-icon": {
                  opacity: 1
                }
              }} 
              IconComponent={() => {
                if (isSorting && orderBy === headCell.id) {
                  return (
                    <Box sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
                      <CircularProgress size={14} />
                    </Box>
                  );
                }
                return <UpDown sx={{
                  fontSize: 14,
                  ml: 1,
                  color: "grey.600"
                }} />;
              }}
            >
              {headCell.label}
            </TableSortLabel>
          </StyledTableCell>)}
      </TableRow>
    </TableHead>;
}