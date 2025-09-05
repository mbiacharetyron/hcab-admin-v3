import React, { useState, useEffect } from 'react';
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CreditCard,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCcw,
  Filter,
  Search,
  BarChart3,
  Wallet,
  Banknote,
  Receipt,
  Eye,
  Download,
  MoreHorizontal
} from "lucide-react";
import { useTransactionReportData } from '@/hooks/useTransactionReport';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import type { WalletTransaction } from '@/lib/api';

export const TransactionReport = () => {
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [transactionTypeFilter, setTransactionTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // API params
  const apiParams = {
    page: currentPage,
    limit: itemsPerPage,
    transaction_type: transactionTypeFilter !== "all" ? transactionTypeFilter as 'deposit' | 'withdrawal' : undefined,
    status: statusFilter !== "all" ? statusFilter as 'completed' | 'pending' | 'failed' : undefined,
    payment_method: paymentMethodFilter !== "all" ? paymentMethodFilter : undefined,
    // Add date filtering logic here if needed
  };
  
  const { walletStats, transactions, pagination, s3pBalance, isLoading, error, refetch } = useTransactionReportData(apiParams);

  // Reset to first page when filters change
  const resetPagination = () => {
    setCurrentPage(1);
  };

  // Reset pagination when filters change
  useEffect(() => {
    resetPagination();
  }, [searchTerm, transactionTypeFilter, statusFilter, paymentMethodFilter, dateFilter]);

  // Use server-side pagination data
  const totalPages = pagination?.total_pages || 1;
  const totalItems = pagination?.total_items || 0;
  const currentPageFromAPI = pagination?.current_page || 1;
  const itemsPerPageFromAPI = pagination?.limit || 10;

  // Get status badge variant
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="success" className="bg-green-100 text-green-700 hover:bg-green-100"><CheckCircle className="w-3 h-3 mr-1" /> Completed</Badge>;
      case "pending":
        return <Badge variant="warning" className="bg-orange-100 text-orange-700 hover:bg-orange-100"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
      case "failed":
        return <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-100"><XCircle className="w-3 h-3 mr-1" /> Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  // Get transaction type badge
  const getTransactionTypeBadge = (type: string) => {
    switch (type) {
      case "deposit":
        return <Badge variant="success" className="bg-green-100 text-green-700 hover:bg-green-100"><ArrowDownLeft className="w-3 h-3 mr-1" /> Deposit</Badge>;
      case "withdrawal":
        return <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-100"><ArrowUpRight className="w-3 h-3 mr-1" /> Withdrawal</Badge>;
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  // Get payment method icon
  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "MTN_MOMO":
        return <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold">M</div>;
      case "ORANGE_MONEY":
        return <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">O</div>;
      case "STRIPE_CARD":
        return <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">S</div>;
      default:
        return <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center text-white text-xs font-bold">?</div>;
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <p>Loading transaction report...</p>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full text-red-500">
          <p>Error: {error.message}</p>
          <Button onClick={() => refetch()} className="ml-4">Retry</Button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Transaction Report</h2>
        <Button onClick={() => refetch()} variant="outline">
          <RefreshCcw className="w-4 h-4 mr-2" /> Refresh Data
        </Button>
      </div>
      <p className="text-muted-foreground">
        Overview of wallet transactions, financial statistics, and payment analytics.
      </p>

      {/* Wallet Stats Cards */}
      {walletStats && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">XAF {walletStats.total_balance.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Current wallet balance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">S3P Balance</CardTitle>
              <Banknote className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">XAF {s3pBalance?.toLocaleString() || '0'}</div>
              <p className="text-xs text-muted-foreground">Payment processor balance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week Deposits</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">XAF {walletStats.current_week.deposits.toLocaleString()}</div>
              <div className="flex items-center text-xs">
                {walletStats.percentage_change.deposits > 0 ? (
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                )}
                <span className={cn(
                  "text-xs",
                  walletStats.percentage_change.deposits > 0 ? "text-green-600" : "text-red-600"
                )}>
                  {Math.abs(walletStats.percentage_change.deposits)}% from last week
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week Withdrawals</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">XAF {walletStats.current_week.withdrawals.toLocaleString()}</div>
              <div className="flex items-center text-xs">
                {walletStats.percentage_change.withdrawals > 0 ? (
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                )}
                <span className={cn(
                  "text-xs",
                  walletStats.percentage_change.withdrawals > 0 ? "text-green-600" : "text-red-600"
                )}>
                  {Math.abs(walletStats.percentage_change.withdrawals)}% from last week
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Comparison */}
            {walletStats && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Weekly Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Deposits</span>
                      <div className="text-right">
                        <div className="font-semibold">XAF {walletStats.current_week.deposits.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">
                          vs XAF {walletStats.previous_week.deposits.toLocaleString()} last week
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Withdrawals</span>
                      <div className="text-right">
                        <div className="font-semibold">XAF {walletStats.current_week.withdrawals.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">
                          vs XAF {walletStats.previous_week.withdrawals.toLocaleString()} last week
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Pending</span>
                      <div className="text-right">
                        <div className="font-semibold">XAF {walletStats.current_week.pending.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">
                          vs XAF {walletStats.previous_week.pending.toLocaleString()} last week
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="w-5 h-5" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Transactions</span>
                  <span className="font-semibold">{totalItems}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Completed</span>
                  <span className="font-semibold text-green-600">
                    {transactions.filter(t => t.status === 'completed').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Pending</span>
                  <span className="font-semibold text-orange-600">
                    {transactions.filter(t => t.status === 'pending').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Failed</span>
                  <span className="font-semibold text-red-600">
                    {transactions.filter(t => t.status === 'failed').length}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                <span>Filters</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search transactions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Type</label>
                  <Select value={transactionTypeFilter} onValueChange={setTransactionTypeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="deposit">Deposits</SelectItem>
                      <SelectItem value="withdrawal">Withdrawals</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Payment Method</label>
                  <Select value={paymentMethodFilter} onValueChange={setPaymentMethodFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Methods" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Methods</SelectItem>
                      <SelectItem value="MTN_MOMO">MTN MoMo</SelectItem>
                      <SelectItem value="ORANGE_MONEY">Orange Money</SelectItem>
                      <SelectItem value="STRIPE_CARD">Stripe Card</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Results</label>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {totalItems} transactions
                    </span>
                    {(searchTerm || transactionTypeFilter !== "all" || statusFilter !== "all" || paymentMethodFilter !== "all") && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSearchTerm("");
                          setTransactionTypeFilter("all");
                          setStatusFilter("all");
                          setPaymentMethodFilter("all");
                          setCurrentPage(1);
                        }}
                        className="text-xs h-6 px-2"
                      >
                        Clear
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transactions Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="w-5 h-5" />
                Transaction List
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Fee</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">#{transaction.id}</TableCell>
                        <TableCell>{getTransactionTypeBadge(transaction.transaction_type)}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">User {transaction.user_id}</div>
                            {transaction.phone_number && (
                              <div className="text-xs text-muted-foreground">
                                {transaction.phone_number}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getPaymentMethodIcon(transaction.payment_method)}
                            <span className="text-sm">{transaction.payment_method}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">XAF {parseFloat(transaction.amount).toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">
                              Final: XAF {parseFloat(transaction.final_amount).toLocaleString()}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">XAF {parseFloat(transaction.fee).toLocaleString()}</div>
                        </TableCell>
                        <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div>{format(new Date(transaction.created_at), "MMM dd, yyyy")}</div>
                            <div className="text-xs text-muted-foreground">
                              {format(new Date(transaction.created_at), "HH:mm")}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Enhanced Pagination */}
              {transactions.length > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between mt-6 space-y-4 sm:space-y-0">
                  {/* Results Summary */}
                  <div className="text-sm text-muted-foreground">
                    Showing {((currentPageFromAPI - 1) * itemsPerPageFromAPI) + 1} to {Math.min(currentPageFromAPI * itemsPerPageFromAPI, totalItems)} of {totalItems} transactions
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex items-center space-x-2">
                      {/* First Page */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPageFromAPI === 1}
                        className="hidden sm:flex"
                      >
                        First
                      </Button>

                      {/* Previous Page */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPageFromAPI === 1}
                      >
                        Previous
                      </Button>

                      {/* Page Numbers */}
                      <div className="flex items-center space-x-1">
                        {(() => {
                          const pages = [];
                          const maxVisiblePages = 5;
                          let startPage = Math.max(1, currentPageFromAPI - Math.floor(maxVisiblePages / 2));
                          const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

                          // Adjust start page if we're near the end
                          if (endPage - startPage + 1 < maxVisiblePages) {
                            startPage = Math.max(1, endPage - maxVisiblePages + 1);
                          }

                          // Add first page and ellipsis if needed
                          if (startPage > 1) {
                            pages.push(
                              <Button
                                key={1}
                                variant={currentPageFromAPI === 1 ? "default" : "outline"}
                                size="sm"
                                onClick={() => setCurrentPage(1)}
                                className="w-8 h-8 p-0"
                              >
                                1
                              </Button>
                            );
                            if (startPage > 2) {
                              pages.push(
                                <span key="ellipsis1" className="px-2 text-muted-foreground">
                                  ...
                                </span>
                              );
                            }
                          }

                          // Add visible page numbers
                          for (let i = startPage; i <= endPage; i++) {
                            pages.push(
                              <Button
                                key={i}
                                variant={currentPageFromAPI === i ? "default" : "outline"}
                                size="sm"
                                onClick={() => setCurrentPage(i)}
                                className="w-8 h-8 p-0"
                              >
                                {i}
                              </Button>
                            );
                          }

                          // Add last page and ellipsis if needed
                          if (endPage < totalPages) {
                            if (endPage < totalPages - 1) {
                              pages.push(
                                <span key="ellipsis2" className="px-2 text-muted-foreground">
                                  ...
                                </span>
                              );
                            }
                            pages.push(
                              <Button
                                key={totalPages}
                                variant={currentPageFromAPI === totalPages ? "default" : "outline"}
                                size="sm"
                                onClick={() => setCurrentPage(totalPages)}
                                className="w-8 h-8 p-0"
                              >
                                {totalPages}
                              </Button>
                            );
                          }

                          return pages;
                        })()}
                      </div>

                      {/* Next Page */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPageFromAPI === totalPages}
                      >
                        Next
                      </Button>

                      {/* Last Page */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPageFromAPI === totalPages}
                        className="hidden sm:flex"
                      >
                        Last
                      </Button>
                    </div>
                  )}

                  {/* Items Per Page Selector */}
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Show:</span>
                    <Select
                      value={itemsPerPage.toString()}
                      onValueChange={(value) => {
                        setItemsPerPage(parseInt(value));
                        setCurrentPage(1); // Reset to first page when changing page size
                      }}
                    >
                      <SelectTrigger className="w-16 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* No Results Message */}
              {transactions.length === 0 && (
                <div className="text-center py-8">
                  <div className="text-muted-foreground mb-2">No transactions found</div>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search criteria or filters
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Transaction Analytics (Coming Soon)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Advanced charts and graphs for transaction trends will be available here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};
