import React from 'react';
import { observer } from 'mobx-react-lite';
import { useFormContext } from '../contexts/FormContext';
import type { YarnCalculationResult } from '../calculations/yarn-calculations';

export const YarnCalculationResults: React.FC = observer(() => {
  const form = useFormContext();
  
  // Try to calculate results if form is ready
  let result: YarnCalculationResult | null = null;
  let error: string | null = null;
  
  if (form.isCalculationReady) {
    try {
      result = form.calculateYarnRequirements();
    } catch (e) {
      error = e instanceof Error ? e.message : 'Calculation failed';
    }
  }
  if (!result && !error) {
    return null; // Don't show anything if no results yet
  }

  if (error) {
    return (
      <div className="mt-8 p-6 bg-red-50 border-2 border-red-200 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-red-600 text-xl">❌</span>
          <h3 className="text-lg font-semibold text-red-800">Calculation Error</h3>
        </div>
        <p className="text-red-700 text-sm">{error}</p>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <div className="mt-8 p-6 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-green-600 text-xl">🧶</span>
        <h3 className="text-lg font-semibold text-gray-800">Yarn Requirements</h3>
        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium uppercase">
          {result.itemType}
        </span>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {/* Total Yarn */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Total Yarn Needed</span>
            <span className="text-xs text-gray-400">grams</span>
          </div>
          <div className="mt-1 text-2xl font-bold text-gray-900">
            {result.totalYarn}g
          </div>
        </div>

        {/* Packs Quantity */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Packs Required</span>
            <span className="text-xs text-gray-400">50g each</span>
          </div>
          <div className="mt-1 text-2xl font-bold text-blue-600">
            {result.yarnPacks} packs
          </div>
        </div>
      </div>

      {/* Formula Display */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-gray-500 text-sm">🧮</span>
          <span className="text-sm font-medium text-gray-600">Calculation Formula</span>
        </div>
        <code className="text-xs text-gray-700 bg-gray-50 p-2 rounded block font-mono overflow-x-auto">
          {result.formula}
        </code>
      </div>

      {/* Additional Info */}
      <div className="mt-4 pt-3 border-t border-gray-200">
        <div className="flex flex-wrap gap-4 text-xs text-gray-500">
          <span>💡 Each pack contains 50g of yarn</span>
          <span>📦 Always round up to complete packs</span>
          <span>🎯 Add 10-15% extra for safety margin</span>
        </div>
      </div>
    </div>
  );
});
