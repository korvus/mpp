import React, { useContext } from 'react';
import baguetteBadge from '../img/bagietteParis.png';
import { PinContext, Text } from '../store';

const Modalcontent = () => {
    const { setDm, dictionary } = useContext(PinContext);

    return (
        <div className="innerModal">
            <div
                title={dictionary?.closeHint || 'Fermer'}
                onClick={() => setDm(false)}
                className="close"
            ></div>
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
            <div
                className="hideModal"
                title={dictionary?.viewMapCTA || 'Voir la carte'}
                onClick={() => setDm(false)}
            >
                <Text tid="viewMapCTA" />
            </div>
            <h2>Contact</h2>
            <p>
                <Text tid="writeMe" />&nbsp;<a href="mailto:ecrivez.moi@simonertel.net">ecrivez.moi@simonertel.net</a>.&nbsp;
            </p>
            <div className="cta-footer">
                <img src={baguetteBadge} alt="Illustration baguette prim�e" className="cta-baguette" />
                <span><Text tid="baguetteCta" /></span>
                <a href="https://bestbaguettes.200.work" target="_blank" rel="noreferrer">bestbaguettes.200.work</a>
            </div>
        </div>
    );
};

export default Modalcontent;
