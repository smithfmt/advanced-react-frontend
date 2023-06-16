import { useCombobox } from "downshift";
import { DropDown, DropDownItem, SearchStyles } from "./styles/DropDown";
import { gql, useLazyQuery } from "@apollo/client";
import debounce from "lodash.debounce";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SEARCH_PRODUCTS_QUERY = gql`
    query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
        searchTerms: products(
            where: {
            OR: [
                { name: { contains: $searchTerm, mode: insensitive } }
                { description: { contains: $searchTerm, mode: insensitive } }
            ]
            }
        ) {
            id
            name
            photo {
            image {
                publicUrlTransformed
            }
            }
        }
    }
`;
const searchLimit = 200;

const Search = () => {
    const [items, setItems] = useState([])
    const [searched, setSearched] = useState(0);
    const router = useRouter();
    const [findItems, {loading, data, error}] = useLazyQuery(SEARCH_PRODUCTS_QUERY, {fetchPolicy: "no-cache"});
    // const findItemsRegulated = debounce(findItems, searchLimit); // query first letter then wait 200ms, check if they have typed in last 200ms then send request or return
    const findItemsRegulated = (searchTerm: string) => {
        const date = new Date();
        const currentTime = date.getTime();
        if (currentTime-searched > searchLimit) {
            findItems({variables: { searchTerm }});
            setSearched(currentTime);
        };
    };

    useEffect(() => {
        if (data?.searchTerms||!items.length) {
            setItems(data?.searchTerms||[]);
        };
    }, [data])

    const { getMenuProps, getInputProps, inputValue, getItemProps, highlightedIndex, isOpen } = useCombobox({
        items,
        onInputValueChange: () => {
            // findItemsRegulated({variables: {searchTerm: inputValue}});
            findItemsRegulated(inputValue);
        },
        onSelectedItemChange: ({ selectedItem }: any) => {
            router.push({
                pathname: `/product/${selectedItem.id}`
            })
        },
        itemToString: (item:any) => item?.name || "",
    });

    useEffect(() => {
        
    }, [inputValue]);
    return (
        <SearchStyles>
            <div>
                <input {...getInputProps({
                    type: "search",
                    placeholder: "Search for an Item",
                    id: "search",
                    className: loading?"loading":undefined,
                })}/>
            </div>
            <DropDown {...getMenuProps()}>
                {isOpen && items.map((item:any, index:number) => {
                    return(
                        <DropDownItem key={item.id} {...getItemProps({ item })} highlight={index === highlightedIndex? `highlight` : undefined}>
                            <img src={item.photo.image.publicUrlTransformed} alt={item.name} width="50" />
                            {item.name}
                        </DropDownItem>
                    )
                })}
                {isOpen && !items.length && inputValue? loading? <DropDownItem>Sorry, No items found for {inputValue}</DropDownItem>: (
                    <DropDownItem>Sorry, No items found for {inputValue}</DropDownItem>
                ):<></>}
            </DropDown>
        </SearchStyles>
    );
};

export default Search;