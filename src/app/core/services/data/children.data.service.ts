import { OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Apollo, QueryRef, Mutation } from 'apollo-angular';
import { FetchResult } from 'apollo-link';
import { DataProxy } from "apollo-cache/lib";
import { pipe, Subscription } from 'rxjs';
import { Child } from '../../types/types';
import { AuthService } from '../authentification/auth.service';
import { ALL_CHILDREN_QUERY,
         AllChildrenQueryResponse,
         THIS_CHILD_QUERY,
         ThisChildQueryResponse,
         CREATE_CHILD_MUTATION,
         CreateChildMutationResponse,
         UPDATE_CHILD_MUTATION,
         UpdateChildMutationResponse,
         DELETE_CHILD_MUTATION,
         DeleteChildMutationResponse
       } from './children.graphql';

export class ChildrenDataService implements OnInit, OnChanges, OnDestroy {
  allChildren: Child[] = [];
  thisChild: Child;

  childId;

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

  poll() {
    const subscription = this.apollo.watchQuery<AllChildrenQueryResponse>({ query: ALL_CHILDREN_QUERY })
            .valueChanges.subscribe( ({data}) => {
               this.allChildren = data.allChildren;
               this.loadingAll = data.loading;
          });

    this.subscriptions = [...this.subscriptions, subscription];
  }

  pollOneChild($id) {
    const subscription = this.apollo.watchQuery<ThisChildQueryResponse>({
      query: THIS_CHILD_QUERY,
      variables: {
        id: $id
      }
    }).valueChanges.subscribe( ({data}) => {
      this.thisChild = data.allChildren[0];
      this.loadingOne = data.loading;
    });

    this.subscriptions = [...this.subscriptions, subscription];
  }

  create($name, $dateOfBirth, $parentsIds) {
    const subscription = this.apollo.mutate<CreateChildMutationResponse>({
      mutation: CREATE_CHILD_MUTATION,
      variables: {
        name: $name,
        dateOfBirth: $dateOfBirth,
        parentsIds: $parentsIds
        },
      update: (store, { data: { createChild } }) => {
        const data: any = store.readQuery({
        query: ALL_CHILDREN_QUERY
        });

        data.allChildren.push(createChild);
        store.writeQuery({ query: ALL_CHILDREN_QUERY, data })
        },
    }).subscribe( ({data}) => {
      const child = data.createChild;
    }, (error) => {
        alert(error)
    });

    this.subscriptions = [...this.subscriptions, subscription];

  }

  update($id, $name, $dateOfBirth) {
    const subscription = this.apollo.mutate<UpdateChildMutationResponse>({
      mutation: UPDATE_CHILD_MUTATION,
      variables: {
        id: $id,
        name: $name,
        dateOfBirth: $dateOfBirth,
      },
      update: (store, { data: { updateChild } }) => {
        const data: any = store.readQuery({ query: ALL_CHILDREN_QUERY });
        let index = 0;
        let found: boolean = false;

        for ( let i = 0; i < data.allChildren.length; i++ ) {
          if ( data.allChildren[i].id === updateChild.id ) {
            index = i;
            found = true;
            break;
          }
        }

        if ( found ) {
          data.allChildren[index] = updateChild;
          store.writeQuery({ query: ALL_CHILDREN_QUERY, data });
        }
      }
    }).subscribe();

    this.subscriptions = [...this.subscriptions, subscription];
  }

  delete($id) {
    const subscription = this.apollo.mutate<DeleteChildMutationResponse>({
      mutation: DELETE_CHILD_MUTATION,
      variables: {
        id: $id
      },
      update: (store, { data: { deleteChild } }) => {
        const data: any = store.readQuery({ query: ALL_CHILDREN_QUERY });
        let index = 0;
        let found: boolean = false;

        for ( let i = 0; i < data.allChildren.length; i++ ) {
          if ( data.allChildren[i].id === deleteChild.id ) {
            index = i;
            found = true;
            break;
          }
        }

        if ( found ) {
          data.allChildren.splice(index,1);
          store.writeQuery({ query: ALL_CHILDREN_QUERY, data });
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
