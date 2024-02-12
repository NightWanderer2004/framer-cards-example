'use client'
import './global.css'
import React, { useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import Card from './Card'
import s from './card.module.css'

export default function App() {
   const [index, setIndex] = useState(false)

   const setCard = id => {
      index === false && setIndex(id)
   }
   const closeCard = () => {
      setIndex(false)
   }

   const cards = [
      {
         id: 1,
         title: 'Title 1',
         count: 11,
         content:
            'Longer Content Text 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl ac tincidunt ultrices, nunc nunc ultrices nunc, nec tincidunt nunc nunc nec nunc.',
      },
      {
         id: 2,
         title: 'Title 2',
         count: 6,
         content:
            'Longer Content Text 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl ac tincidunt ultrices, nunc nunc ultrices nunc, nec tincidunt nunc nunc nec nunc.',
      },
      {
         id: 3,
         title: 'Title 3',
         count: 8,
         content:
            'Longer Content Text 3 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl ac tincidunt ultrices, nunc nunc ultrices nunc, nec tincidunt nunc nunc nec nunc.',
      },
      {
         id: 4,
         title: 'Title 4',
         count: 14,
         content:
            'Longer Content Text 4 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl ac tincidunt ultrices, nunc nunc ultrices nunc, nec tincidunt nunc nunc nec nunc.',
      },
   ]

   return (
      <LayoutGroup>
         <motion.div className='card-list'>
            {cards.map(card => (
               <Card key={card.id} id={card.id} title={card.title} onClick={() => setCard(card.id)} />
            ))}
         </motion.div>
         <AnimatePresence>
            {index !== false && (
               <>
                  <Card
                     id={index}
                     title={cards.find(card => card.id === index).title}
                     count={cards.find(card => card.id === index).count}
                     content={cards.find(card => card.id === index).content}
                     closeCard={closeCard}
                     isSelected={true}
                  />
                  <motion.div
                     className={s.modalBackdrop}
                     onClick={() => closeCard()}
                     variants={{
                        hidden: {
                           opacity: 0,
                           transition: {
                              duration: 0.16,
                           },
                        },
                        visible: {
                           opacity: 0.8,
                           transition: {
                              delay: 0.04,
                              duration: 0.2,
                           },
                        },
                     }}
                     initial='hidden'
                     exit='hidden'
                     animate='visible'
                  />
               </>
            )}
         </AnimatePresence>
      </LayoutGroup>
   )
}
