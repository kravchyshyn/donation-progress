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
    const treeMap = d3.treemap()
      .size([this.options.width, this.options.height])
    ;
    const root = d3.hierarchy(JSON.parse(this.donationsHistory), (d: any) => d.children)
      .sum((d: any) => d.donation);
    const tree = treeMap(root);

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

        d3.select('#tooltip #person')
          .text(d.data.person);
          d3.select('#tooltip #donation')
            .text('$' + d.data['donation']);
          d3.select('#tooltip').classed('hidden', false);
        })
      .on('mouseout', function() {
        d3.select('#tooltip').classed('hidden', true);
      })
      .text((d: any) => '$ ' + d.data.donation);

      nodes
        .transition()
        .duration(this.options.duration);
  }
}
