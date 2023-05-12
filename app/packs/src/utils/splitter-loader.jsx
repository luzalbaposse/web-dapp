import React, { lazy, Suspense } from 'react'
const Component = lazy(() => import("src/components/discovery"));

const LoadLazy = (props) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Component {...props}/>
        </Suspense>
    )
}

export default (props, railsContext) => {
    return () => (
        <LoadLazy {...props} railsContext={railsContext} />
    );
  };
