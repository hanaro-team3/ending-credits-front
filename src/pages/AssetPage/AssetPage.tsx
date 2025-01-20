import * as styled from "./styles";
import { useState } from "react";

// components
import Header from "../../layout/Header";
import { AssetNone } from "./components/AssetNone";
import { AssetView } from "./components/AssetView";

function AssetPage() {
    const [hasAssets, setHasAssets] = useState(false);


    return (
        <styled.Container>
            <Header title="자산 현황" showClose={false} />
            {hasAssets ? (
                <AssetView />
            ) : (
                <AssetNone />

            )}
        </styled.Container>
    );
}

export default AssetPage;
