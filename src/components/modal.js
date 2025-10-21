import React, {useContext} from 'react';
import baguetteBadge from '../img/bagietteParis.png';
import { PinContext, Text } from '../store';


const Modalcontent = () => {
    const {setDm} = useContext(PinContext);
    return (
        <div className="innerModal">
            <div title="Echap" onClick={() => setDm(false)} className="close"></div>
            <h2><Text tid="About" /></h2>
            <p>
                <Text tid="aboutIntro" />{' '}
                <a target="_blank" rel="noreferrer" href="https://www.instagram.com/lepaindemonquartier/">
                    <Text tid="aboutAccountLabel" />
                </a>.
            </p>
            <p>
                <Text tid="aboutDisclaimer" />
            </p>
            <h2>Contact</h2>
            <p>
                <Text tid="writeMe" />&nbsp;<a href="mailto:ecrivez.moi@simonertel.net">ecrivez.moi@simonertel.net</a>.&nbsp;
            </p>
            <div className="cta-footer">
                <img src={baguetteBadge} alt="Illustration baguette primee" className="cta-baguette" />
                <span><Text tid="baguetteCta" /></span>
                <a href="https://bestbaguettes.200.work" target="_blank" rel="noreferrer">bestbaguettes.200.work</a>
            </div>
        </div>
    );
}

export default Modalcontent;




