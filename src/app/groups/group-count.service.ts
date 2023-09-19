import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GroupCountService {
  private groupCounts: { [groupNumber: string]: number } = {};

  constructor() {}

  getGroupCount(groupNumber: string): number {
    return this.groupCounts[groupNumber] || 0;
  }

  incrementGroupCount(groupNumber: string) {
    this.groupCounts[groupNumber] = (this.groupCounts[groupNumber] || 0) + 1;
  }

  decrementGroupCount(groupNumber: string) {
    // Уменьшаем счетчик студентов в группе с использованием GroupCountService
    this.groupCounts[groupNumber] = (this.groupCounts[groupNumber] || 0) - 1;
  }
}
