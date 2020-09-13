import * as d3 from 'd3';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-tree-map',
  templateUrl: './tree-map.component.html',
  styleUrls: ['./tree-map.component.scss']
})
export class TreeMapComponent implements OnInit, OnChanges {
  public static DEFAULT_URL = 'https://c.pxhere.com/photos/4f/ee/candy_toppings_sweet_colorful_sugar-883692.jpg!d';
  public treeMapDiv;

  public options: any = {
    width: 600,
    height: 300,
    duration: 500
  };

  @Input('newDonation') newDonation;
  @Input('expected') expected;
  @Input('totalRaised') totalRaised;
  @Input('donationsHistory') donationsHistory;
  @Input('backgroundUrl') backgroundUrl;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.renderTreeMap();
    this.animateTreeMap();
  }

  ngOnInit() {
    this.renderTreeMap();
    this.animateTreeMap();
  }

  formatMoney(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  renderTreeMap() {
    if (this.treeMapDiv) {
      d3.select('div.tree').html('');
      return;
    }

    const url =  this.backgroundUrl || TreeMapComponent.DEFAULT_URL;

    this.treeMapDiv = d3.select('.tree-map')
      .append('div')
      .attr('class', 'tree')
      .style('width', this.options.width + 'px')
      .style('height', this.options.height + 'px')
      .style('background', `url('${url}')`);
  }

  animateTreeMap() {
    const treeMap = d3.treemap().size([this.options.width, this.options.height]);
    const root = d3.hierarchy(JSON.parse(this.donationsHistory), (d: any) => d.children)
      .sum((d: any) => d.donation);
    const tree = treeMap(root);
    // const tool = d3.select( 'body').append('div').attr('class', 'toolTip');

    // const mousemove = function(d) {
    //   const xPosition = d3.event.pageX + 5;
    //   const yPosition = d3.event.pageY + 5;
    //
    //   d3.select('#tooltip')
    //     .style('left', xPosition + 'px')
    //     .style('top', yPosition + 'px');
    //   // d3.select('#tooltip #heading')
    //   //   .text(JSON.stringify(d));
    //   d3.select('#tooltip #revenue')
    //     .text('£' + d['donation'].toFixed(0));
    //   d3.select('#tooltip').classed('hidden', false);
    // };
    //
    const mouseout = function() {
      d3.select('#tooltip').classed('hidden', true);
    };

    const nodes = this.treeMapDiv.datum(root).selectAll('.node')
      .data(tree.leaves())
      .enter()
      .append('div')
      .attr('class', 'node')
      .style('left', (d: any) => d.x0 + 'px')
      .style('bottom', (d: any) => d.y0 + 'px')
      .style('height', (d: any) => Math.max(0, d.y1 - d.y0  - 1) + 'px')
      .style('width', (d: any) => Math.max(0, d.x1 - d.x0 - 1) + 'px')

      .style('background-color', (d: any) =>  d.parent.data.color )
      .on('mousemove', (event: any,  d: any) => {
          d3.select('#tooltip')
            .style('left', event.pageX + 'px')
            .style('top', event.pageY + 'px');

        d3.select('#tooltip #percentage')
          .text(d.data.person)
          d3.select('#tooltip #revenue')
            .text('$' + d.data['donation'])
          d3.select('#tooltip').classed('hidden', false);
        })
      .on('mouseout', mouseout)
      .text((d: any) => d.data.person)
      ;

      nodes
        .transition()
        .duration(this.options.duration);
      // .
      // on('mousemove', function (d: any) {
      //   tool.style('left', d3.event.pageX + 10 + 'px');
      //   tool.style('top', d3.event.pageY - 20 + 'px');
      //   tool.style('display', 'inline-block');
      //   tool.html(d.children ? null : d.name + '<br>' + ' $ ' + this.formatMoney(Math.round(d.donation * 1000)));
      // }.bind(this)).on('mouseout', function (d: any) {
      // tool.style('display', 'none');
      // });
  }
}
