"use client"

import styles from './markdownChat.module.css'


function HumanBubble({ text }: { text: string }) {
	return (
		<div className='flex flex-row justify-end'>
			<div className={'bg-primary rounded-2xl p-2 m-2 ' + styles.markdown} 
			dangerouslySetInnerHTML={{ __html: text }}>
			</div>
		</div>
	)
}

function AiBubble({ text }: { text: string }) {
	return (
		<div className='flex flex-row justify-start'>
			<div className={'bg-secondary rounded-2xl p-2 m-2 ' + styles.markdown}
				dangerouslySetInnerHTML={{ __html: text }}>
			</div>
		</div>
	)
}

export { HumanBubble, AiBubble }