import * as styled from "./styles";
import { useState, useEffect } from "react";

// components
import Header from "../../layout/Header";
import { AssetNone } from "./components/AssetNone";
import { AssetRegister } from "./components/AssetRegister";
import { AssetView } from "./components/AssetView";

function AssetPage() {
    const [hasAssets, setHasAssets] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [title, setTitle] = useState("자산 현황");

    useEffect(() => {
        if (isRegister) setTitle("자산 연결");
    }, [isRegister]);

    return (
        <styled.Container>
            <Header title={title} showClose={false} />
            {hasAssets ? (
                <AssetView />
            ) : (
                isRegister ? (
                    <AssetRegister onRegister={() => setHasAssets(true)} />
                ) : (
                    <AssetNone onRegister={() => setIsRegister(true)} />
                )
            )}
        </styled.Container>
    );
}

export default AssetPage;
