import { PAGINATION_QUERY } from "../components/Pagination";

const paginationField = () => {
    return {
        keyArgs: false,
        read(existing = [], { args, cache }: any) {
            // Asks cache for items
            const { skip, take } = args;
            const data = cache.readQuery({ query: PAGINATION_QUERY });
            const count = data?.productsCount;
            const page = skip / take + 1;
            const pages = Math.ceil(count / take);
            // check for existing items
            const items = existing.slice(skip, skip + take).filter(x => x);
            if (items.length && items.length !== take && page === pages) {
                return items;
            };
            if (items.length !== take) {
                // Return false if need to go to network
                return false;
            };
            if (items.length) {
                return items;
            };
            return false;
        },
        merge(existing = [], incoming: any, { args }: any) {
            // put returned items back into cache
            const { skip, take } = args;
            let merged = existing ? existing.slice(0) : [] as any;
            for (let i = skip; i < skip + incoming.length; ++i) {
                merged[i] = incoming[i - skip];
            };
            return merged;
        },
    }
};

export default paginationField;