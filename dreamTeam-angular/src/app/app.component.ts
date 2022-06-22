import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from './service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'dreamTeam-angular';
  players: Player[] = []
  displayedColumns: string[] = ['Id', 'Name', 'Matches', 'Data'];
  dataSource = new MatTableDataSource<Player>(this.players);
  openGraphics = false
  labels = []
  mediumData = []
  shootingData = []
  centerData = []
  defenseData = []
  mediumChart: any
  shootingChart: any
  centerChart: any
  defenseChart: any

  constructor(private dataService: DataService){}

  ngOnInit(): void {
    this.dataService.getData().subscribe(result => {
      result.pyres.forEach((item:any) => {
        for (let values of Object.values(item)) {
          var test :[] = values as []
          var contador = 0
          test.forEach(data => {
            if(contador == 1){
              this.players.push(data)
            }
            contador = contador + 1
          })
          
        }
      })
      this.dataSource = new MatTableDataSource<Player>(this.players);
      console.log(this.players)
    })
  }

  transformObjectIntoArray(object: Object){
    var array = []
    for (let values of Object.values(object)) {
      array.push(values)
    }
    return array
  }

  seeData(player: Player){
    console.log(player)
    this.mediumData = this.transformObjectIntoArray(player.medium) as []
    this.shootingData = this.transformObjectIntoArray(player.shooter) as []
    this.centerData = this.transformObjectIntoArray(player.center) as []
    this.defenseData = this.transformObjectIntoArray(player.defense) as []
    this.labels = this.transformObjectIntoArray(player.matches) as []
    this.startGraphics()
    this.openGraphics = true
  }

  startGraphics(){
    this.mediumChart = {
      labels: this.labels,
      datasets: [
          {
              label: 'Media',
              data: this.mediumData,
              fill: true,
              borderColor: '#FFA726',
              tension: .4,
              backgroundColor: 'rgba(255,167,38,0.2)'
          }
      ]
    }
    this.shootingChart = {
      labels: this.labels,
      datasets: [
          {
              label: 'Delantero',
              data: this.shootingData,
              fill: true,
              borderColor: '#FFA726',
              tension: .4,
              backgroundColor: 'rgba(255,167,38,0.2)'
          }
      ]
    }
    this.centerChart = {
      labels: this.labels,
      datasets: [
          {
              label: 'Center',
              data: this.centerData,
              fill: true,
              borderColor: '#FFA726',
              tension: .4,
              backgroundColor: 'rgba(255,167,38,0.2)'
          }
      ]
    }
    this.defenseChart = {
      labels: this.labels,
      datasets: [
          {
              label: 'Defense',
              data: this.defenseData,
              fill: true,
              borderColor: '#FFA726',
              tension: .4,
              backgroundColor: 'rgba(255,167,38,0.2)'
          }
      ]
    }
  }
}

export interface Player {
  id: string,
  name: string,
  matches: string[],
  goals: number[],
  medium: Object,
  shooter: Object,
  center: Object,
  defense: Object
}
