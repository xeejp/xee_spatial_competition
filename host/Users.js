import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import throttle from 'react-throttle-render'

import { Card, CardHeader, CardText } from 'material-ui/Card'
import { getRoleName, getStateName } from 'util/index.js'

import { openParticipantPage } from './actions'

const User = ({ id, role, point, pair_id, openParticipantPage }) => (
  <tr><td><a onClick={openParticipantPage(id)}>{id}</a></td>
  <td>{getRoleName(role)}</td>
  <td>{point}</td>
  <td>{pair_id}</td>
  </tr>
)

const UsersList = ({participants, openParticipantPage }) => (
  <table>
    <thead><tr><th>ID</th><th>役割</th><td>ポイント</td><td>所属ペアID</td></tr></thead>
    <tbody>
      {
        Object.keys(participants).map(id => (
          <User
            key={id}
            id={id}
            role={participants[id].role}
            point={participants[id].point}
            pair_id={participants[id].pair_id}
            openParticipantPage={openParticipantPage}
          />
        ))
      }
    </tbody>
  </table>
)

const Pair = ({ id, pair_state, members  }) => (
  <tr><td>{id}</td><td>{getStateName(pair_state)}</td><td>{members[0] + "と" +  members[1]}</td></tr>
)

const Pairs = ({ pairs, participants, }) => (
  <table>
    <thead><tr><th>ID</th><th>状況</th><th>メンバーID</th></tr></thead>
    <tbody>
      {
        Object.keys(pairs).map(id => (
          <Pair
            key={id}
            id={id}
            pair_state={pairs[id].pair_state}
            members={pairs[id].members}
          />
        ))
      }
    </tbody>
  </table>
)

const mapStateToProps = ({ pairs, participants, game_round, participantsNumber }) => ({
  pairs, participants, game_round, participantsNumber
})

const mapDispatchToProps = (dispatch) => {
  const open = bindActionCreators(openParticipantPage, dispatch)
  return {
    openParticipantPage: (id) => () => open(id)
  }
}

const Users = ({ pairs, participants, game_round, openParticipantPage, participantsNumber }) => (
  <div>
    <Card style={{margin: '16px 16px'}}>
      <CardHeader
        title={"登録者 " + participantsNumber + "人"}
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        <UsersList
          participants={participants}
          openParticipantPage={openParticipantPage}
        />
      </CardText>
    </Card>
    <Card style={{margin: '16px 16px'}}>
      <CardHeader
        title={"ペア (" + Object.keys(pairs).length + ")"}
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        <Pairs
          pairs={pairs}
          participants={participants}
          game_round={game_round}
        />
      </CardText>
    </Card>
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(throttle(Users, 200))
