import React, {useEffect, useState} from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import _ from 'lodash'
import 'semantic-ui-css/semantic.min.css';
import { Button, Card, Divider, Image, Placeholder, Header, Icon, Modal } from 'semantic-ui-react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import Result from './Result';


const cards = [
   
   {
      id:1,
      avatar:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVV4SPNYPCzGDrKjZb8vGfYhzYBt5NneSCnGl1StYq4gkSpC18JrKzz8AFJBani3rz-_U&usqp=CAU",
      date: 'Joined in 2013',
     header: 'BJP',
     description: 'Bharat Janitya Party',
   },
   {
      id:2,
     avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9MvWw8T6EN5vIsefiQxdWWeqfCFup1NEgq4NOqx_LtOzVrt_pXXTuleX4UKSCCMK89L4&usqp=CAU",
     date: 'Joined in 2013',
     header: 'Congress',
     description: 'Congress National Party',
   },

 ]
 
const Profile = () => {
    const { user, isAuthenticated} = useAuth0();
    const [open, setOpen] = useState(false);
    const [openVoted, setOpenVoted] = useState(false);
    const [loading, setLoading] = useState(false);
   const [datauser,setDatauser] = useState([]);
    useEffect(() => {
      axios.get("https://655086627d203ab6626de137.mockapi.io/vote").then(
      (response) => {
          console.log(response.data);
          setDatauser(response.data);
      },
      (err) => {
          console.log(err);
      });
  },[]);

   const chanuser = 0;
   const realvoteA = 0;
   const realvoteB = 0;

   let [voteA,setVoteA] = useState(0);
   let [voteB,setVoteB] = useState(0);
   let [voted,setVoted] = useState(false);

for(let item of datauser){
   if(item.name === user?.given_name){
      voteA=item.partyA;
      voteB=item.partyB;
      voted=true;
   }
   else{
      console.log(item.name);
   }
}
      
      const reset = () => {
         localStorage.removeItem('votekeyA');
         localStorage.removeItem('votekeyB');
      }

      const submitVote = () => {
         axios
            .post("https://655086627d203ab6626de137.mockapi.io/vote", {
               name: user.given_name,
               avatar:cards.avatar,
               partyA: voteA,
               partyB: voteB,
            })
            .then(
               (response) => {
                  console.log(response);
               },
               (err) => {
                  console.log(err);
               }
            )
      }



    return (
      
       isAuthenticated && (
         <>
            <article>
               {user?.picture && <img src={user.picture} alt={user?.given_name} />}
               <h2>{user?.given_name}</h2>
               {localStorage.setItem('username',user.name)}
               <ul>
                     {Object.keys(user).map((objKey, i) => <li key={i} >{objKey}: {user[objKey]}</li>)}
               </ul>
            </article>
   
            <Divider />
            <h2>You have Voted For:</h2>
            <h3>BJP: {voteA}</h3>
            <h3>Congress: {voteB}</h3>
            
            <Card.Group doubling itemsPerRow={3} stackable>
            {_.map(cards, (card) => (
               <Card key={card.header}>
                  {loading ? (
                  <Placeholder>
                     <Placeholder.Image square />
                  </Placeholder>
                  ) : (
                  <Image src={card.avatar} />
                  )}
   
                  <Card.Content>
                  {loading ? (
                     <Placeholder>
                        <Placeholder.Header>
                        <Placeholder.Line length='very short' />
                        <Placeholder.Line length='medium' />
                        </Placeholder.Header>
                        <Placeholder.Paragraph>
                        <Placeholder.Line length='short' />
                        </Placeholder.Paragraph>
                     </Placeholder>
                  ) : (
                     <>
                        <Card.Header>{card.header}</Card.Header>
                        <Card.Meta>{card.date}</Card.Meta>
                        <Card.Description>{card.description}</Card.Description>
                     </>
                  )}
                  </Card.Content>
   
                  <Card.Content extra>
                  <Button disabled={voted} onClick={() =>[ card.id === 1 
                                                               ? (setVoteA(1),localStorage.setItem('votekeyA',voteA), localStorage.setItem('useremail',user?.email))
                                                               : (setVoteB(1),localStorage.setItem('votekeyB',voteB), localStorage.setItem('useremail',user?.email)) ,setVoted(true),setOpen(true)]} primary>
                     Vote For Me
                  </Button>
                  {/* <Button disabled={loading}>Delete</Button> */}
                  </Card.Content>
               </Card>
            ))}
            </Card.Group>
            <Modal
               basic
               onClose={() => setOpen(false)}
               onOpen={() => setOpen(true)}
               open={open}
               size='small'
               //trigger={<Button>Basic Modal</Button>}
            >
               <Header icon>
                  <Icon name='archive' />
                     You are about to vote for this party
                  </Header>
               <Modal.Content>
                  <p>
                     Are you sure?
                  </p>
               </Modal.Content>
               <Modal.Actions>
                  <Button basic color='red' inverted onClick={() => setOpen(false)}>
                     <Icon name='remove' /> No
                  </Button>
                  <Button color='green' inverted onClick={() => [setOpen(false),setOpenVoted(true),submitVote()]}>
                     <Icon name='checkmark' /> Yes
                  </Button>
               </Modal.Actions>
            </Modal>
            <Modal
               basic
               onClose={() => setOpenVoted(false)}
               onOpen={() => setOpenVoted(true)}
               open={openVoted}
               size='small'
               //trigger={<Button>Basic Modal</Button>}
            >
               <Header icon>
                  <Icon name='archive' />
                     You are Voted
                  </Header>
               <Modal.Content>
                  <h4>
                    Thanks! Want to see the results?
                  </h4>
               </Modal.Content>
               <Modal.Actions>
                  <Button basic color='red' inverted onClick={() =>[ setOpenVoted(false),setOpen(false)]}>
                     <Icon name='remove' /> No
                  </Button>
                  <Link to='/result'>
                     <Button color='green' inverted onClick={() => [setOpenVoted(false),setOpen(false)]}>
                        <Icon name='checkmark' /> Yes
                     </Button>
                  </Link>
               </Modal.Actions>
            </Modal>
         </>
 
        
       )
    );
}

export default Profile;
