import { OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Apollo, QueryRef, Mutation } from 'apollo-angular';
import { FetchResult } from 'apollo-link';
import { DataProxy } from "apollo-cache/lib";
import { pipe, Subscription } from 'rxjs';
import { Parent } from '../../types/types';
import { GC_PARENT_ID } from '../../types/constants'
import { AuthService } from '../authentification/auth.service';
import { ALL_PARENTS_QUERY,
         AllParentsQueryResponse,
         THIS_PARENT_QUERY,
         ThisParentQueryResponse,
         CREATE_PARENT_MUTATION,
         CreateParentMutationResponse,
         SIGNIN_PARENT_MUTATION,
         SigninParentMutationResponse,
         UPDATE_PARENT_MUTATION,
         UpdateParentMutationResponse,
         DELETE_PARENT_MUTATION,
         DeleteParentMutationResponse
        } from './parent.graphql';

export class ParentDataService implements OnInit, OnChanges, OnDestroy {
  allParents: Parent[] = [];
  thisParent: Parent;

  parentId;

  loadingAll: boolean = true;
  loadingOne: boolean = true;

  subscriptions: Subscription[] = [];

  constructor( private authService: AuthService,
               private apollo: Apollo
             ) {
  }

  ngOnInit() {
    this.initialize();
  }

  ngOnChanges() {
    this.initialize();
  }

  initialize() {
    this.poll();
  }

  create($name, $email, $password, $dateOfBirth) {
    this.apollo.mutate<CreateParentMutationResponse>({
      mutation: CREATE_PARENT_MUTATION,
      variables: {
        name: $name,
        email: $email,
        password: $password,
        dateOfBirth: $dateOfBirth
        },
    }).subscribe( ({data}) => {
      const id = data.authenticateParent.id;
      const name = data.authenticateParent.name;
      const token = data.authenticateParent.token;
      this.authService.saveParentData(id, name, token);
    }, (error) => {
        alert(error)
    });
  }

  signin($email, $password) {
    this.apollo.mutate<SigninParentMutationResponse>({
      mutation: SIGNIN_PARENT_MUTATION,
      variables: {
        email: $email,
        password: $password
      }
    }).subscribe( ({data}) => {
      const id = data.authenticateParent.id;
      const name = data.authenticateParent.name;
      const token = data.authenticateParent.token;
      this.authService.saveParentData(id, name, token);
    }, (error) => {
      alert(error)
    });
  }

  poll() {
    const subscription = this.apollo.watchQuery<AllParentsQueryResponse>({ query: ALL_PARENTS_QUERY })
            .valueChanges.subscribe( ({data}) => {
               this.allParents = data.allParents;
               this.loadingAll = data.loading;
          });

    this.subscriptions = [...this.subscriptions, subscription];

    this.pollThisParent();
  }

  pollThisParent() {
    const parentId = localStorage.getItem ( GC_PARENT_ID );

    if (parentId) {
      this.pollOneParent(parentId);
    }
  }

  pollOneParent($id) {
    const subscription = this.apollo.watchQuery<ThisParentQueryResponse>({
      query: THIS_PARENT_QUERY,
      variables: {
        id: $id
      }
    }).valueChanges.subscribe( ({data}) => {
      this.thisParent = data.allParents[0];
      this.loadingOne = data.loading;
    });

    this.subscriptions = [...this.subscriptions, subscription];
  }

  update($id, $name, $email, $dateOfBirth) {
    const subscription = this.apollo.mutate<UpdateParentMutationResponse>({
      mutation: UPDATE_PARENT_MUTATION,
      variables: {
        id: $id,
        name: $name,
        email: $email,
        dateOfBirth: $dateOfBirth,
      },
      update: (store, { data: { updateParent } }) => {
        const data: any = store.readQuery({ query: ALL_PARENTS_QUERY });
        let index = 0;
        let found: boolean = false;

        for ( let i = 0; i < data.allParents.length; i++ ) {
          if ( data.allParents[i].id === updateParent.id ) {
            index = i;
            found = true;
            break;
          }
        }

        if ( found ) {
          data.allParents[index] = updateParent;
          store.writeQuery({ query: ALL_PARENTS_QUERY, data })
        }
      }
    }).subscribe();

    this.subscriptions = [...this.subscriptions, subscription];
  }

  delete($id) {
    const subscription = this.apollo.mutate<DeleteParentMutationResponse>({
      mutation: DELETE_PARENT_MUTATION,
      variables: {
        id: $id
      },
      update: (store, { data: { deleteParent } }) => {
        const data: any = store.readQuery({ query: ALL_PARENTS_QUERY });
        let index = 0;
        let found: boolean = false;

        for ( let i = 0; i < data.allParents.length; i++ ) {
          if ( data.allParents[i].id === deleteParent.id ) {
            index = i;
            found = true;
            break;
          }
        }

        if ( found ) {
          data.allParents.splice(index,1);
          store.writeQuery({ query: ALL_PARENTS_QUERY, data })
        }
      }
    }).subscribe();

    this.subscriptions = [...this.subscriptions, subscription];
  }

  ngOnDestroy(): void {
    for (let sub of this.subscriptions) {
      if (sub && sub.unsubscribe) {
        sub.unsubscribe();
      }
    }
  }
}
