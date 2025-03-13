import { Component, input } from '@angular/core';
import { SongFolder } from '../../common/types/song.type';
import { IBandMember, IBandMemberClass } from '../../common/types/member.type';
import { Todo } from '../../common/types/todo.type';
import { COMPARE_BAND_MEMBERS } from '../../common/constants/band-members.constant';
import { TodoService } from './todo.service';
import { MatDialog } from '@angular/material/dialog';
import { EditTodoComponent } from './components/edit-todo/edit-todo.component';
import { DeleteTodoComponent } from './components/delete-todo/delete-todo.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-todo',
  imports: [MatChipsModule, MatTableModule, CommonModule, MatBadgeModule, MatInputModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  public songFolder = input<SongFolder | undefined>();

  public showData = false;
  public numberOfTodos = 0;
  public displayedColumns: string[] = ["song", "descr", "resp", "actions"];
  public bandMembers: IBandMember[] = [];
  public selectedBandMembers:IBandMemberClass =  {};
  public filteredTodos: Todo[] = [];
  public searchTerm: string = '';

  private allTodos: Todo[] = [];
  private bandMemberComperator = COMPARE_BAND_MEMBERS;
  constructor(
    private readonly todoService: TodoService,
    public dialog: MatDialog
  ) { 
  }

  ngOnInit(): void {
    this.todoService.allTodos$.subscribe(inputTodoList => {
      this.allTodos = inputTodoList;
      this.filterTodolist()
      this.bandMembers = [];
      this.filteredTodos.forEach(aTodo => {
        aTodo.responsibles?.forEach(aResp => {
          if (this.bandMembers.findIndex(aBandMember => aResp.name === aBandMember.name) === -1) {
            this.bandMembers.push(aResp)
          }
          
        });
      })
      this.numberOfTodos = this.filteredTodos.length;
    });
  }

  public openEditDialog(aTodo: Todo): void {
    const dialogRef = this.dialog.open(EditTodoComponent, {
      width: '80%',
      data: aTodo
    });

    dialogRef.afterClosed().subscribe((result: Todo) => {
      if(result) {
        this.todoService.saveTodo(result);
      }
      
    });
  }

  public openDeletetDialog(aTodo: Todo): void {
    const dialogRef = this.dialog.open(DeleteTodoComponent, {
      width: '80%',
      data: aTodo
    });

    dialogRef.afterClosed().subscribe((result: Todo) => {
      if(result) {
        this.todoService.deleteTodo(result);
      }
      
    });
  }

  public filterClickBandMember(member: IBandMember) {
    this.showData = true;
    if (this.selectedBandMembers[member.name]) {
      delete this.selectedBandMembers[member.name];
    } else {
      this.selectedBandMembers[member.name] = member;
    }
    this.filterTodolist();
  }
  public refresh(): void {
  }

  public filterSearchTerm() {
    this.filterTodolist();
  }

  private filterTodolist() {
    this.filteredTodos = this.allTodos.filter(aTodo => {
      if (this.songFolder() && aTodo.song?.id !== this.songFolder()?.id) {
        return false;
      }
      const memberKeys = Object.keys(this.selectedBandMembers);
      if (memberKeys?.length > 0) {
        let found = false;
        for (const aMemberName of memberKeys) {
          if (!aTodo.responsibles) {
            return false;
          }
          if (aTodo.responsibles.findIndex(iTodo => this.bandMemberComperator(iTodo, this.selectedBandMembers[aMemberName])) > -1) {
            found = true;
          }
        }
        if (!found) {
          return false
        }
      }

      if (this.searchTerm) {
        const lowerSearchTerm = this.searchTerm.toLowerCase();
        if (aTodo.description?.toLowerCase().indexOf(lowerSearchTerm) === -1
            && aTodo.song?.name.toLowerCase().indexOf(lowerSearchTerm) === -1) {
          return false;
        }
      }
      return true;
    });
  }
}
