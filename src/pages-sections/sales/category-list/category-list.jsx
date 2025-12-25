import { forwardRef, memo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

// CUSTOM GLOBAL COMPONENTS
import IconComponent from "components/IconComponent";

// STYLED COMPONENTS
import { CategoryBoxWrapper, StyledChip, StyledRoot } from "./styles";

// CATEGORY INTERFACE MODEL


// ==============================================================


// ==============================================================

const CategoryList = forwardRef(({
  categories
}, ref) => {
  const params = useParams();
  return <StyledRoot ref={ref}>
      {categories.map(item => {
      const selectedItem = item.slug === params.slug;
      return <Link key={item.slug} href={`/allProducts/${item.slug}`}>
            <CategoryBoxWrapper selected={selectedItem}>
              <IconComponent icon={item.icon} className="icon" />
              <p className="title">{item.name}</p>

              <StyledChip size="small" color="primary" label="Upto 40% off" selected={selectedItem} />
            </CategoryBoxWrapper>
          </Link>;
    })}
    </StyledRoot>;
});

CategoryList.displayName = 'CategoryList';
export default memo(CategoryList);