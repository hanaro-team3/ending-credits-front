import * as styled from "./styles";
import { useEffect, useState } from "react";

// components
import Header from "../../layout/Header";
import { AssetNone } from "./components/AssetNone";
import { AssetView } from "./components/AssetView";

// services
import { memberService } from "../../services/api/Member";

function AssetPage() {
    const [hasAssets, setHasAssets] = useState(true);

    useEffect(() => {
        memberService.getMemberConnected().then((response) => {
            setHasAssets(response.data.result);
        });
    }, []);


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
