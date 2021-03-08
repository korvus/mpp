import React, {useContext} from 'react';
import LanguageSelector from './languageSelector';
import { PinContext, Text } from '../store';


const Modalcontent = () => {
    const {setDm} = useContext(PinContext);
    return (
        <div className="innerModal">
            <div title="Echap" onClick={() => setDm(false)} className="close"></div>
            <LanguageSelector />
            <h2><Text tid="About" /></h2>
            <p>
                <Text tid="goalContent" />
                <Text tid="contestwikipedia" />
                <Text tid="goalContentEnd" />
            </p>
            <h2>Contact</h2>
            <p>
                <Text tid="writeMe" />&nbsp;<a href="mailto:ecrivez.moi@simonertel.net">ecrivez.moi@simonertel.net</a>.&nbsp;
            </p>
        </div>
    );
}

export default Modalcontent;