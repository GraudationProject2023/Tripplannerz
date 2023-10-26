import React from 'react'
import moment from 'moment'
import { Card } from 'react-bootstrap'

export const Schedule =({value}) => {
    return(
    <div className = "Expense">
        <Card>
          <Card.Header>
            <h3>{moment(value).format('YYYY년 MM월 DD일')}</h3>
          </Card.Header>
          <Card.Body>
            
          </Card.Body>
        </Card>
    </div>
    )   
}