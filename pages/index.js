/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import db from '../db.json';

import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Input from '../src/components/Input';
import Button from '../src/components/Button'

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  console.log('retorno do usestate', name, setName);
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <Widget 
        as={motion.section}
        transition={{duration: 0.5}}
        variants={{
          show: {opacity: 1}, hidden: {opacity: 0}
        }}
        initial="hidden"
        animate="show"
        >
          <Widget.Header>
            <h1>Quiz de Baianidades</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={(event) => {
              event.preventDefault();
              router.push(`/quiz?name=${name}`);
            }}
            >
              <Input
                name="nomeDoUsuario"
                onChange={(event) => {
                  setName(event.target.value);
                }}
                placeholder="Informe seu nome"
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                {`Jogar como ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget
        as={motion.section}
        transition={{delay: 0.5, duration: 0.5}}
        variants={{
          show: {opacity: 1}, hidden: {opacity: 0}
        }}
        initial="hidden"
        animate="show"        
        >
          <Widget.Content>
            <h1>Outros quizes</h1>
            <ul>
              {db.external.map((linkExterno) =>{
                const [nomeDoProjeto, usuarioGitHub] = linkExterno.replace(/\//g, '').replace('https:', '').replace('.vercel.app', '').split('.');

                return (
                  <li key={linkExterno}>
                    <Widget.Topic href={linkExterno}>
                      {`${usuarioGitHub}/${nomeDoProjeto}`}
                      </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer 
        as={motion.section}
        transition={{delay: 1, duration: 0.5}}
        variants={{
          show: {opacity: 1}, hidden: {opacity: 0}
        }}
        initial="hidden"
        animate="show"        
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/uitallorss" />
    </QuizBackground>
  );
}
