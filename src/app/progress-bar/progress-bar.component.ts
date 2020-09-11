import * as d3 from 'd3';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit, OnChanges {
  public progressWidth = 600;
  public prevProgressWidth = 0;
  public currentProgressWidth = 0;
  public options;
  public progressBar;

  @Input('newDonation') newDonation;
  @Input('expected') expected;
  @Input('totalRaised') totalRaised;
  @Input('donationsStorage') donationsStorage;

  constructor() {
    this.options = {
      className: '.d3-progress',
      height: 60,
      width: 600,
      barColor: '#fefefe',
      progressColor: 'orange',
      animationDuration: 2000
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.prevProgressWidth = this.currentProgressWidth;
    this.currentProgressWidth = this.totalRaised * (this.progressWidth /  this.expected);

    this.renderProgressBar();
    this.animateProgressBar();
  }

  renderProgressBar() {
    if (this.progressBar) {
      return;
    }

    this.progressBar = d3.select(this.options.className)
      .append('svg')
      .attr('width', this.options.width)
      .attr('height', this.options.height);

    this.progressBar.append('rect')
      .attr('class', 'progressBar')
      .attr('width', this.options.width)
      .attr('height', this.options.height / 2)
      .style('fill', this.options.barColor);
  }

  animateProgressBar() {
    d3.selectAll(this.options.className + ' .progress').remove();
    d3.selectAll(this.options.className + ' text').remove();

    this.progressBar.append('rect')
      .attr('class', 'progress')
      .attr('height', this.options.height / 2)
      .style('fill', this.options.progressColor)
      .attr('width', this.prevProgressWidth)
      .transition()
      .duration(this.options.animationDuration)
      .attr('width', this.currentProgressWidth);

    this.progressBar.append('text')
      .attr('y', this.options.height)
      .style('text-anchor', 'middle')
      .text('▲')
      .attr('x', this.prevProgressWidth)
      .transition()
      .duration(this.options.animationDuration)
      .attr('x', this.currentProgressWidth);

    this.progressBar.append('text')
      .attr('y', 20)
      .style('text-anchor', 'top')
      .text(`${Math.round(this.totalRaised / this.expected * 100) } %`)
      .attr('x', this.options.width / 2 - 10)
      .transition()
      .duration(this.options.animationDuration);
  }


  ngOnInit() {
    this.prevProgressWidth = this.currentProgressWidth;
    this.currentProgressWidth = this.totalRaised * (this.progressWidth /  this.expected);

    this.renderProgressBar();
    this.animateProgressBar();
  }
}
