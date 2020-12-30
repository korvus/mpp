import React, {useContext} from 'react';
import sources from '../datas/roots.json';
import { PinContext } from '../store';

function ListSources(){
    const listDate = Object.keys(sources);

    const sourcesByYear = [];
    for (const [index, value] of listDate.entries()) {
        sourcesByYear.push(<li key={index}><a target="_blank" href={sources[value]}>{value}</a></li>);
    }
    return sourcesByYear;
}

const Modalcontent = () => {
    const {setDm} = useContext(PinContext);
    return (
        <div className="innerModal">
            <div title="Echap" onClick={() => setDm(false)} className="close"></div>
            <h2>Qu'est ce que c'est</h2>
            <p>
                Ce site répertorie les 10 premiers lauréats et le gagnant de chaque année du <a href="https://fr.wikipedia.org/wiki/Concours_de_la_meilleure_baguette_de_Paris">concours de la meilleurs baguette de Paris</a>, de ses débuts (1994) à aujourd'hui (2020).
            </p>
            <h2>Sources</h2>
            <p>
                Seuls les classements à partir de l'année 2010 sont trouvable en ligne, il n'existe pas d'archives accessibles publiquement.
                <br />
                Ci-dessous la liste des sources pour chaque années.
                <br />
                Toute aide est la bienvenue si vous disposez de sources pour les années antérieures. Envoyez moi un e-mail à&nbsp;
                <a href="mailto:ecrivez.moi@simonertel.net">écrivez.moi@simonertel.net</a>
            </p>
            <ul>
                <ListSources />
            </ul>
            <h2>Contact & code source.</h2>
            <p>
                Vous pouvez m'écrire directement a <a href="mailto:ecrivez.moi@simonertel.net">ecrivez.moi@simonertel.net</a>.
                Le code source est disponible <a target="blank" href="https://github.com/korvus/mbp">ici</a>.
            </p>
            <h2>Divers.</h2>
            <p>
                Si vous aimez faire du pain, il existe aussi cette application que j'ai <a target="blank" href="https://patefolle.vercel.app/">développé</a>.
            </p>
        </div>
    );
}

export default Modalcontent;