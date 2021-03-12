import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Editor from '../editor/editor';
import Footer from '../footer/footer';
import Header from '../header/header';
import Preview from '../preview/preview';
import styles from './maker.module.css';

const Maker = ({ FileInput, authService }) => {
    const [cards, setCards] = useState({
        1: {
            id: '1',
            name: 'Myung',
            company: 'JMP Company',
            theme: 'dark',
            title: 'Software Engineer',
            email: 'myungtech@gmail.com',
            message: 'Shut up And TRY !!!',
            fileName: 'myungtech',
            fileURL: null
        },
        2: {
            id: '2',
            name: 'React',
            company: 'SPA Company',
            theme: 'light',
            title: 'Software Engineer',
            email: 'myungtech@gmail.com',
            message: 'Never STOP !!!',
            fileName: 'myungtech',
            fileURL: null
        },
        3: {
            id: '3',
            name: 'HOOKS',
            company: 'HOOKS Company',
            theme: 'colorful',
            title: 'Software Engineer',
            email: 'myungtech@gmail.com',
            message: 'You Can Do IT REACT !!!',
            fileName: 'myungtech',
            fileURL: null
        }
    });

    const history = useHistory();
    const onLogout = () => {
        authService.logout();
    }

    // callback함수를 전달해줌
    useEffect(() => {
        authService.onAuthChange(user => {
            if (!user) {
                history.push('/');
            }
        })
    });

    const createOrUpdateCard = (card) => {
        setCards(cards => {
            const updated = { ...cards };
            updated[card.id] = card;
            return updated;
        });
    };
    const deleteCard = (card) => {
        setCards(cards => {
            const updated = { ...cards };
            delete updated[card.id];
            return updated;
        });
    };

    return (
        <section className={styles.maker}>
            <Header onLogout={onLogout} />
            <div className={styles.container}>
                <Editor
                    FileInput={FileInput}
                    cards={cards}
                    addCard={createOrUpdateCard}
                    updateCard={createOrUpdateCard}
                    deleteCared={deleteCard}
                />
                <Preview cards={cards} />
            </div>
            <Footer />
        </section>
    );
};

export default Maker;