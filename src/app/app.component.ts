import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
export interface WebsiteTable {
  company: any;
  currentMarketPrice: any;
  predictedPrice: any;
  signalColor: string;
  signal: any;
  stopLoss: string;
  sentimentScore:any;
  sentimentColor: string;
  fundamentalColor: string;
  fundamentalScore: any;
  piotroskiScore: any;
  basicEPS: any;
  ROE: any;
  grossProfitMargin: any;
  riskClass: string;
  nseTicker: string;
  sector:string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private http: HttpClient){}
  title = 'technifunds';
  risk : any;
  invDuration : any;
  //displayedColumns: string[] = ['company', 'currentMarketPrice', 'predictedPrice', 'signal', 'stopLoss','sentimentScore'];
  displayedColumns: string[] = [];
  //dataSource = ELEMENT_DATA;
  flag: any=0;
  websiteTableData= '/assets/WebsiteTable.csv';
  clickedRows = new Set<WebsiteTable>();
  websiteTable :any[] = [];
  selectedStock: WebsiteTable = {company: "a", currentMarketPrice:1, predictedPrice: 1, signal:'a', stopLoss:'1', sentimentScore:1, sentimentColor:"red",
                                signalColor:"yellow", fundamentalColor:"red", fundamentalScore:1, piotroskiScore:1, basicEPS:1, ROE:1, grossProfitMargin:1,
                                riskClass:"low",nseTicker:"abc",sector:"xyz"};

  abc: any;
  xyz: WebsiteTable = {company: "a", currentMarketPrice:1, predictedPrice: 1, signal:'a', stopLoss:'1', sentimentScore:1, sentimentColor:"red",
  signalColor:"yellow", fundamentalColor:"red", fundamentalScore:1, piotroskiScore:1, basicEPS:1, ROE:1, grossProfitMargin:1,
  riskClass:"low",nseTicker:"abc",sector:"xyz"};
  dataSource: WebsiteTable[] = [];
  selectFlag: number=0;
  sentimentChartPath: string = "";
  supportResistanceChartPath: string="";
  changePercent: Number=0;
  changePercentColor: string="";
  dailogBox: string="close";

  searchClick() {
  
    this.selectFlag=0;
    this.websiteTableData="/assets/prediction_"+this.invDuration+".csv";
    //remember to remove irrelevant column names
    this.displayedColumns=['company', 'currentMarketPrice', 'signal','fundamentalScore','sentimentScore'];
    this.dataSource = [];
    
    console.log("Hi");
    console.log(this.risk);
    console.log(this.invDuration);
    console.log(this.websiteTableData);
 
    this.getInfo();
    this.flag=1;
    console.log("datasource");
    console.log(this.dataSource);
  
  }
  closeDailog(){
    this.dailogBox = 'close'
  }
  selectCompany(stock: any){
    this.sentimentChartPath="/assets/sentiment_graphs/"+stock.nseTicker+".jpg";
    this.supportResistanceChartPath = "/assets/support_resistance/"+stock.nseTicker+".jpg";
    this.selectFlag=1;
    console.log(stock);
    this.selectedStock.company = stock.company;
    this.selectedStock.currentMarketPrice = stock.currentMarketPrice;
    this.selectedStock.predictedPrice = stock.predictedPrice;
    this.selectedStock.signalColor = stock.signalColor;
    this.selectedStock.signal = stock.signal;
    this.selectedStock.stopLoss = stock.stopLoss;
    this.selectedStock.sentimentColor = stock.sentimentColor;
    this.selectedStock.sentimentScore = stock.sentimentScore;
    this.selectedStock.fundamentalColor = stock.fundamentalColor;
    this.selectedStock.fundamentalScore = stock.fundamentalScore;
    this.selectedStock.piotroskiScore = stock.piotroskiScore;
    this.selectedStock.basicEPS = stock.basicEPS;
    this.selectedStock.ROE = stock.ROE;
    this.selectedStock.grossProfitMargin = stock.grossProfitMargin;
    this.selectedStock.riskClass = stock.riskClass;
    this.selectedStock.nseTicker = stock.nseTicker;
    this.selectedStock.sector = stock.sector;
    this.changePercent=((this.selectedStock.predictedPrice-this.selectedStock.currentMarketPrice)/this.selectedStock.currentMarketPrice)*100;
    this.changePercent= Number(this.changePercent.toFixed(2));
    if(this.changePercent>0){
      this.changePercentColor="green";
    }
    else{
      this.changePercentColor="red";
    }
    this.dailogBox = 'open'
  }
  getInfo(){
    this.http.get(this.websiteTableData, {responseType: 'text'})
    .subscribe(
      (        data: any) => {
            console.log(data);
            const list = data.split('\n');
            list.forEach( (e: any) =>{
              
              const x = e.split(',');
              console.log(x);

              console.log("x[0]")
              console.log(x[0])

              this.xyz = {company: x[0], currentMarketPrice:Number(x[1]).toFixed(2), predictedPrice:Number(x[2]).toFixed(2), signalColor:x[3], signal:x[4], stopLoss:x[5],
                 sentimentColor:x[6], sentimentScore:Number(x[7]), fundamentalColor:x[8], fundamentalScore:Number(x[9]), piotroskiScore:Number(x[10]),
                basicEPS: Number(x[11]), ROE: Number(x[12]), grossProfitMargin: Number(x[13]), riskClass: x[14], nseTicker:x[15],sector:x[16]};
              console.log("this.xyz")
              console.log(this.xyz)
              if(this.risk==this.xyz.riskClass){
                this.dataSource.push(this.xyz);
              }
              console.log(this.dataSource);

            })

        },
      (        error: any) => {
            console.log(error);
        }
    );

    return;
  }
}