import { useState, useRef } from "react";
import { BsChevronDown } from "react-icons/bs"

const Accordion = ({ items }) => {
  const [accordianState, setAccordianState] = useState(items.reduce((accordianState, item) => {
    accordianState[item.key] = false;
    return accordianState;
  }, {}))

  const handleToggle = (itemKey) => () => {
    console.log('clicked');
    setAccordianState(oldState => ({
      ...oldState,
      [itemKey]: !oldState[itemKey]
    }))
  }

  if (!items.length) return null;
  return (
    <div style={styles.accordian}>
      {items.map(item => (
        <AccordionItem item={item} expanded={accordianState[item.key]} onClick={handleToggle(item.key)} key={item.key} />
      ))}
    </div>
  )
}


const AccordionItem = ({ item, expanded, onClick }) => {
  const accordianBodyRef = useRef();

  return (
    <div style={{
      ...styles.accordianItem,
      cursor: item.expandable ? 'pointer' : 'default'
    }}>
      <div style={styles.accordianHeader} onClick={onClick}>
        <div>{item.header}</div>
        <div style={{
          ...styles.chevron,
          ...(item.expandable && expanded ? styles.chevronExpanded : {})
        }}>
          {
            item.expandable
              ? <BsChevronDown color='gray' />
              : <div style={styles.chevronNull} />
          }
        </div>
      </div>
      {Boolean(item.alwaysBody) &&
        <div>
          {item.alwaysBody}
        </div>
      }
      <div
        style={{
          ...styles.accordianBody,
          ...((expanded || item.alwaysShow) ? accordianExpanded(accordianBodyRef?.current?.scrollHeight) : {})
        }}
        ref={accordianBodyRef}
      >
        {item.body}
      </div>
    </div>
  )
}

const styles = {
  accordian: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  accordianItem: {
    borderTop: '1px solid rgb(214, 214, 216)'
  },
  accordianHeader: {
    height: '55px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontWeight: 'bold'
  },
  accordianBody: {
    transition: 'max-height 0.2s ease-out',
    maxHeight: '0px',
    overflow: 'hidden',
  },
  chevron: {
    transition: 'transform 0.2s ease-out'
  },
  chevronExpanded: {
    transform: 'rotate(180deg)'
  },
  chevronNull: {
    height: '1px',
    backgroundColor: 'hsl(0, 0%, 70%)',
    width: '13px',
    margin: '0px 2px'
  }
}

const accordianExpanded = (scrollHeight) => ({
  maxHeight: `${scrollHeight}px`,
})

export { Accordion }
